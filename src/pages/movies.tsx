import { MoviesFiltersForm, MoviesFiltersFormProps } from '@/components/forms';
import { PublicLayout } from '@/components/layouts';
import { ContentList, FiltersContainer } from '@/components/shared';
import { ContentTypes } from '@/constants';
import { discoverMoviesCl, DiscoverMoviesQParams, MovieListsResponse } from '@/interfaces/api';
import { useAutocompleteHelpers } from '@/utility';
import { Container } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import Pagination from '../components/pagination';
import { NextPageWithLayout } from './_app';

const Movies: NextPageWithLayout = () => {
   const router = useRouter();
   const fitersAppldFrmQry = useRef<boolean>(false);
   const [moviesRes, setMoviesRes] = useState<MovieListsResponse>();
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
   };

   const clearFilters = () => {
      setFilters({});
   };

   const changePage = async (page: any) => {
      setFilters((prevState) => ({
         ...prevState,
         page,
      }));
   };

   useEffect(() => {
      if (!router.isReady || fitersAppldFrmQry.current) return;
      setFilters(() => ({ ...router.query }));
      fitersAppldFrmQry.current = true;
   }, [router]);

   useEffect(() => {
      getMovies();

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

      async function getMovies() {
         const res = await discoverMoviesCl({
            ...filters,
         });

         if (res.status === 200) {
            setMoviesRes(res.data);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [filters]);

   return (
      <>
         <Head>
            <title>Explore Movies</title>
            <meta name="description" content="Browse movie details and find more on imdb." key="movie-page" />
         </Head>
         <Container maxWidth={false}>
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
            <ContentList contents={moviesRes?.results} />
            <Pagination movies={moviesRes} handleClick={changePage} />
         </Container>
      </>
   );
};

Movies.getLayout = (page: ReactElement) => {
   return <PublicLayout>{page}</PublicLayout>;
};

export default Movies;
