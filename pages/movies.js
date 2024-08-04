import MovieCard from '../components/movie_card';
import Loading from '../components/loadingMsg';
import Pagination from '../components/pagination';
import Layout from '../components/layout';
import { getFromSessionStorage, storeInsSessionStorage } from '../actions/localStorageHelpers';
import { fetchPostReq } from '../actions/search';
import { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import Head from 'next/head';

export default function Movies() {
   const [movies, setMovies] = useState();
   const discoveredMovies = getFromSessionStorage('movies_dis');
   const type = 'movie';

   const loadMovies = async (url, objData, locName) => {
      const data = await fetchPostReq(url, objData);
      if (data.error) {
         return console.error(data, 'this is coming from the movies');
      }
      setMovies(data);
      locName.map((lname) => storeInsSessionStorage(lname, data));
   };

   useEffect(() => {
      if (!discoveredMovies) {
         loadMovies(
            '/api/discover/movies',
            {
               type: type,
            },
            ['movies_dis']
         );
      } else {
         setMovies(discoveredMovies);
      }
   }, []);

   const changePage = async (page) => {
      if (!getFromSessionStorage(`movies_p${page}`)) {
         loadMovies('/api/discover/movies', { type: type, pg: `${page}` }, ['movies_dis', `movies_dis${page}`]);
      } else {
         setMovies(getFromSessionStorage(`movies_dis${page}`));
      }
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
