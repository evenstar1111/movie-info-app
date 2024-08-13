import { PublicLayout } from '@/components/layouts';
import { ContentList } from '@/components/shared';
import { discoverMoviesCl, DiscoverMoviesQParams, MovieListsResponse } from '@/interfaces/api';
import { Container } from '@mui/material';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import Pagination from '../components/pagination';
import { NextPageWithLayout } from './_app';

const Movies: NextPageWithLayout = () => {
   const [moviesRes, setMoviesRes] = useState<MovieListsResponse>();
   const [filters, setFilters] = useState<DiscoverMoviesQParams>({});

   useEffect(() => {
      getMovies();

      async function getMovies() {
         const res = await discoverMoviesCl({
            ...filters,
         });

         if (res.status === 200) {
            setMoviesRes(res.data);
         }
      }
   }, [filters]);

   const changePage = async (page: any) => {
      setFilters((prevState) => ({
         ...prevState,
         page,
      }));
   };

   return (
      <>
         <Head>
            <title>Explore Movies</title>
            <meta name="description" content="Browse movie details and find more on imdb." key="movie-page" />
         </Head>
         {/* <MoviesFiltersForm updateFilters={setFilters} /> */}
         <Container maxWidth={false}>
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
