import { MoviesFiltersForm, MoviesFiltersFormProps } from '@/components/forms';
import { PublicLayout } from '@/components/layouts';
import { MuiLinearProgress } from '@/components/mui';
import { ContentList, FiltersContainer } from '@/components/shared';
import { ContentTypes } from '@/constants';
import { discoverMoviesCl, DiscoverMoviesQParams, MovieListsResponse } from '@/interfaces/api';
import { switchAll, useAutocompleteHelpers } from '@/utility';
import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { NextPageWithLayout } from './_app';

type MoviesMetrices = Pick<MovieListsResponse, 'page' | 'total_pages' | 'total_results'>; //TODO: create a generic type, store globally.

const Movies: NextPageWithLayout = () => {
   const router = useRouter();
   const fitersAppldFrmQry = useRef<boolean>(false);
   const [movies, setMovies] = useState<MovieListsResponse['results']>([]);
   const [moviesMetrices, setMoviesMetrices] = useState<MoviesMetrices>();
   const [loadingOnScrl, setLoadingOnScrl] = useState<boolean>(false);

   const [filters, setFilters] = useState<DiscoverMoviesQParams>({});
   const [filterDlgOpen, setFilterDlgOpen] = useState<boolean>(false);

   const [prsnAtcOptions, prsnAtcInputHandler] = useAutocompleteHelpers(ContentTypes.Person);
   const [kwAtcOptions, kwAtcInputHandler] = useAutocompleteHelpers('keyword');

   const filtersCount = useMemo(() => {
      const filtersWithValues = Object.values(filters).filter((v) => v !== '');
      return filtersWithValues.length;
   }, [filters]);

   const onFiltersFormSubmit: MoviesFiltersFormProps['onFormSubmit'] = (data) => {
      setFilters({ ...data });
      setFilterDlgOpen(false);
      fetchMovies({ ...data }, true);
   };

   const clearFilters = () => {
      setFilters({});
      fetchMovies({}, true);
   };

   const changePage = async (page: any) => {
      setFilters((prevState) => ({
         ...prevState,
         page,
      }));
      await fetchMovies(
         {
            ...filters,
            page,
         },
         true
      );
      scrollToTop();
   };

   const fetchMovies = async function (filterArgs: DiscoverMoviesQParams = filters, pageChange?: boolean) {
      const res = await discoverMoviesCl({
         ...filterArgs,
      });

      if (res.status === 200) {
         const data = res.data;
         setMovies((prevMovies) => {
            if (pageChange) return data.results || [];
            return [...prevMovies, ...(data.results || [])];
         });
         setMoviesMetrices({
            page: data.page,
            total_pages: data.total_pages,
            total_results: data.total_results,
         });
      }
   };

   const scrollToTop = () => {
      document.documentElement.scrollTop = 0; // For most browsers
      document.body.scrollTop = 0; // For Safari
   };

   useEffect(() => {
      if (!router.isReady || fitersAppldFrmQry.current) return;

      setFilters(() => ({ ...router.query }));
      fetchMovies({ ...router.query });

      fitersAppldFrmQry.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [router]);

   useEffect(() => {
      if (router) {
         router.push(
            {
               href: router.pathname,
               query: {
                  ...filters,
               },
            },
            undefined,
            {
               shallow: true,
            }
         );
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [filters]);

   useEffect(() => {
      if (!window || !document || !moviesMetrices) return;

      const { page, total_pages } = moviesMetrices;

      const handleScroll = switchAll(async () => {
         const advance = 50;
         const wIH = window.innerHeight;
         const htmlST = document.documentElement.scrollTop;
         const htmlOHgt = document.documentElement.offsetHeight;

         const currentHgt = wIH + htmlST + advance;

         if (currentHgt < htmlOHgt) return;

         if (page < total_pages) {
            setLoadingOnScrl(true);
            await fetchMovies({
               ...filters,
               page: `${page + 1}`,
            });
            setLoadingOnScrl(false);
         }
      }, 500);

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [moviesMetrices?.page, moviesMetrices?.total_pages, filters]);

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
                  defaultFilters={filters}
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
            {!loadingOnScrl && <MuiLinearProgress color="primary" centered />}
            <Pagination movies={moviesMetrices} handleClick={changePage} />
         </Container>
      </>
   );
};

Movies.getLayout = (page: ReactElement) => {
   return <PublicLayout>{page}</PublicLayout>;
};

export default Movies;
