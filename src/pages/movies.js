import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import { fetchPostReq } from '../actions/search';
import Layout from '../components/layout';
import Loading from '../components/loadingMsg';
import MovieCard from '../components/movie_card';
import Pagination from '../components/pagination';

export default function Movies() {
   const [movies, setMovies] = useState();
   const type = 'movie';

   const loadMovies = async (url, objData, locName) => {
      const data = await fetchPostReq(url, objData);
      if (data.error) {
         return console.error(data, 'this is coming from the movies');
      }
      setMovies(data);
   };

   useEffect(() => {
      loadMovies(
         '/api/discover/movies',
         {
            type: type,
         },
         ['movies_dis']
      );
   }, []);

   const changePage = async (page) => {
      loadMovies('/api/discover/movies', { type: type, pg: `${page}` }, ['movies_dis', `movies_dis${page}`]);
   };

   return (
      <Layout>
         <Head>
            <title>Explore Movies</title>
            <meta name="description" content="Browse movie details and find more on imdb." key="movie-page" />
         </Head>
         <Container className="mt-2" fluid>
            <Row className="justify-content-center" noGutters>
               {movies ? movies.results && <MovieCard movies={movies.results} type="movie" /> : <Loading />}
            </Row>
            <Pagination movies={movies} handleClick={changePage} />
         </Container>
      </Layout>
   );
}
