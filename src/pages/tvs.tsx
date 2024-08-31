import { TvsFiltersForm, TvsFiltersFormProps } from '@/components/forms';
import { PublicLayout } from '@/components/layouts';
import { MuiLinearProgress } from '@/components/mui';
import { ContentList, FiltersContainer } from '@/components/shared';
import { discoverTvsCl, DiscoverTvsQParams, DiscoverTvsQParamsKey } from '@/interfaces/api';
import { ListsFiltersState } from '@/types';
import { scrollToTop, useAutocompleteHelpers, useFetchContentList } from '@/utility';
import { Box, Button, Container, Snackbar, Stack, SxProps, Theme } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MouseEventHandler, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { NextPageWithLayout } from './_app';

type FiltersState = ListsFiltersState<DiscoverTvsQParams>;

const filtersContainerWrpprSx: SxProps<Theme> = (theme) => ({
   position: 'sticky',
   top: 0,
   zIndex: theme.zIndex.appBar,
   backgroundColor: theme.palette.background.default,
});

const Tvs: NextPageWithLayout = () => {
   const router = useRouter();
   const fitersAppldFrmQry = useRef<boolean>(false);

   const [filtersState, setFiltersState] = useState<FiltersState>({
      isReady: false,
      filters: {},
   });
   const [filterDlgOpen, setFilterDlgOpen] = useState<boolean>(false);
   const [loadOnScroll, setLoadOnScroll] = useState<boolean>(false);
   const [snackbarMsg, setSnackbarMsg] = useState<string>('');

   const [kwAtcOptions, kwAtcInputHandler] = useAutocompleteHelpers('keyword');

   const {
      contents: tvs,
      metrices: tvsMetrices,
      loading,
      loadingOnScrl,
      isLastPageActive,
      loadMore,
   } = useFetchContentList({
      loadOnScroll,
      filtersState,
      fetchContentFn: discoverTvsCl,
   });

   const filtersCount = useMemo(() => {
      const filtersWithValues = Object.keys(filtersState.filters).filter((key) => {
         const k = key as DiscoverTvsQParamsKey;
         const currFilter = filtersState.filters[k];
         const hasValue = currFilter !== '' && currFilter !== undefined && currFilter !== null;
         return hasValue && k !== 'page';
      });

      return filtersWithValues.length;
   }, [filtersState.filters]);

   const updateFiltersState = (data: Partial<FiltersState>) => {
      setFiltersState((prevState) => ({
         ...prevState,
         ...data,
      }));
   };

   const onFiltersFormSubmit: TvsFiltersFormProps['onFormSubmit'] = (data) => {
      updateFiltersState({
         filters: {
            ...data,
            page: '1',
         },
      });
      setFilterDlgOpen(false);
   };

   const clearFilters = () => {
      updateFiltersState({
         filters: {},
      });
   };

   const changePage = async (page: any) => {
      updateFiltersState({
         filters: {
            ...filtersState.filters,
            page,
         },
      });
      scrollToTop();
   };

   const onFiltersWrpprDblClick: MouseEventHandler<HTMLDivElement> = (event) => {
      /* FIXME: consider this as a temp workaround. it should be done thoughtfully. */
      const notPermitted = !event.currentTarget.contains(event.target as Node);
      if (notPermitted) return;

      const enabledOnScroll = loadOnScroll;
      setLoadOnScroll((prev) => !prev);
      setSnackbarMsg(enabledOnScroll ? 'Disabled Infinite Scrolling' : 'Enabled Infinite Scrolling');
   };

   const handleSnackbarClose = () => {
      setSnackbarMsg(''); // TODO: manage snakbars centrally, setup a nice system.
   };

   /**
    * Update filters from query parameters on page load.
    */
   useEffect(() => {
      if (!router.isReady || fitersAppldFrmQry.current) return;

      updateFiltersState({
         isReady: true,
         filters: { ...router.query },
      });

      fitersAppldFrmQry.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [router]);

   return (
      <>
         <Head>
            <title>Explore Tvs</title>
            <meta name="description" content="Browse Tvs" key="tvs-page" />
         </Head>
         <Container maxWidth={false} sx={{ pb: 20 }}>
            <Box onDoubleClick={onFiltersWrpprDblClick} sx={filtersContainerWrpprSx}>
               <FiltersContainer
                  dlgOpen={filterDlgOpen}
                  setDlgOpen={setFilterDlgOpen}
                  clearFilters={clearFilters}
                  filtersCount={filtersCount}
               >
                  <TvsFiltersForm
                     onFormSubmit={onFiltersFormSubmit}
                     defaultFilters={filtersState.filters}
                     kwAtcProps={{
                        handleInputChange: kwAtcInputHandler,
                        options: kwAtcOptions,
                     }}
                  />
               </FiltersContainer>
            </Box>
            <ContentList contents={tvs} />
            {!loadOnScroll && !isLastPageActive && (
               <Stack direction="row" justifyContent="center">
                  <Button onClick={loadMore}>{loading ? 'Loading...' : 'Load More'}</Button>
               </Stack>
            )}
            {loadingOnScrl && <MuiLinearProgress color="primary" centered />}
            {!!tvsMetrices && <Pagination movies={tvsMetrices} handleClick={changePage} />}
         </Container>
         <Snackbar
            open={!!snackbarMsg}
            autoHideDuration={1000}
            onClose={handleSnackbarClose}
            message={snackbarMsg}
            anchorOrigin={{
               horizontal: 'center',
               vertical: 'top',
            }}
         />
      </>
   );
};

Tvs.getLayout = (page: ReactElement) => {
   return <PublicLayout>{page}</PublicLayout>;
};

export default Tvs;
