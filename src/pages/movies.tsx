import { MoviesFiltersForm, MoviesFiltersFormProps } from '@/components/forms';
import { PublicLayout } from '@/components/layouts';
import { MuiLinearProgress } from '@/components/mui';
import { ContentList, FiltersContainer } from '@/components/shared';
import { ContentTypes } from '@/constants';
import { discoverMoviesCl, DiscoverMoviesQParams } from '@/interfaces/api';
import { ListsFiltersState } from '@/types';
import { useAutocompleteHelpers, useFetchContentList } from '@/utility';
import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { NextPageWithLayout } from './_app';

type FiltersState = ListsFiltersState<DiscoverMoviesQParams>;

const Movies: NextPageWithLayout = () => {
   const router = useRouter();
   const fitersAppldFrmQry = useRef<boolean>(false);

   const [filtersState, setFiltersState] = useState<FiltersState>({
      isReady: false,
      filters: {},
   });
   const [filterDlgOpen, setFilterDlgOpen] = useState<boolean>(false);

   const [prsnAtcOptions, prsnAtcInputHandler] = useAutocompleteHelpers(ContentTypes.Person);
   const [kwAtcOptions, kwAtcInputHandler] = useAutocompleteHelpers('keyword');

   const {
      contents: movies,
      metrices: moviesMetrices,
      loading,
      loadingOnScrl,
   } = useFetchContentList({
      filtersState,
      fetchContentFn: discoverMoviesCl,
   });

   const filtersCount = useMemo(() => {
      const filtersWithValues = Object.values(filtersState.filters).filter((v) => v !== '');
      return filtersWithValues.length;
   }, [filtersState.filters]);

   const updateFiltersState = (data: Partial<FiltersState>) => {
      setFiltersState((prevState) => ({
         ...prevState,
         ...data,
      }));
   };

   const onFiltersFormSubmit: MoviesFiltersFormProps['onFormSubmit'] = (data) => {
      updateFiltersState({
         filters: { ...data },
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

   /* TODO: make it global */
   const scrollToTop = () => {
      document.documentElement.scrollTop = 0; // For most browsers
      document.body.scrollTop = 0; // For Safari
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
            <title>Explore Movies</title>
            <meta name="description" content="Browse movie details and find more on imdb." key="movie-page" />
         </Head>
         <Container maxWidth={false} sx={{ pb: 20 }}>
            <FiltersContainer
               dlgOpen={filterDlgOpen}
               setDlgOpen={setFilterDlgOpen}
               clearFilters={clearFilters}
               filtersCount={filtersCount}
            >
               <MoviesFiltersForm
                  onFormSubmit={onFiltersFormSubmit}
                  defaultFilters={filtersState.filters}
                  kwAtcProps={{
                     handleInputChange: kwAtcInputHandler,
                     options: kwAtcOptions,
                  }}
                  prsnAtcProps={{
                     handleInputChange: prsnAtcInputHandler,
                     options: prsnAtcOptions,
                  }}
               />
            </FiltersContainer>
            <ContentList contents={movies} />
            {loadingOnScrl && <MuiLinearProgress color="primary" centered />}
            <Pagination movies={moviesMetrices} handleClick={changePage} />
         </Container>
      </>
   );
};

Movies.getLayout = (page: ReactElement) => {
   return <PublicLayout>{page}</PublicLayout>;
};

export default Movies;
