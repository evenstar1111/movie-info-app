import { MoviesFiltersForm } from '@/components/forms';
import { discoverMoviesCl, DiscoverMoviesQParams } from '@/interfaces/api';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import Layout from '../components/layout';
import Loading from '../components/loadingMsg';
import MovieCard from '../components/movie_card';
import Pagination from '../components/pagination';

export default function Movies() {
   const [movies, setMovies] = useState();
   const type = 'movie';
   const [filters, setFilters] = useState<DiscoverMoviesQParams>({});

   useEffect(() => {
      getMovies();

      async function getMovies() {
         const res = await discoverMoviesCl({
            ...filters,
         });

         if (res.status === 200) {
            setMovies(res.data);
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
      <Layout>
         <Head>
            <title>Explore Movies</title>
            <meta name="description" content="Browse movie details and find more on imdb." key="movie-page" />
         </Head>
         <MoviesFiltersForm updateFilters={setFilters} />
         <Container className="mt-2" fluid>
            <Row className="justify-content-center" noGutters>
               {movies ? (
                  (movies as any).results && <MovieCard movies={(movies as any)?.results} type="movie" />
               ) : (
                  <Loading />
               )}
            </Row>
            <Pagination movies={movies} handleClick={changePage} />
         </Container>
      </Layout>
   );
}
