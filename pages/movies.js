import MovieCard from '../components/movie_card';
import Loading from '../components/loadingMsg';
import Pagination from '../components/pagination';
import Layout from '../components/layout';
import {
  getFromLocalStorage,
  storeInLocalStorage,
} from '../actions/localStorageHelpers';
import { fetchPostReq } from '../actions/search';
import { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';

export default function Movies() {
  const [movies, setMovies] = useState();
  const discoveredMovies = getFromLocalStorage('movies_dis');

  const loadMovies = async (url, objData, locName) => {
    const data = await fetchPostReq(url, objData);
    if (data.error) {
      return console.error(data, 'this is coming from the movies');
    }
    setMovies(data);
    locName.map((lname) => storeInLocalStorage(lname, data));
  };

  useEffect(() => {
    if (!discoveredMovies) {
      loadMovies(
        '/api/discover/movies',
        {
          type: 'movie',
        },
        ['movies_dis']
      );
    } else {
      setMovies(discoveredMovies);
    }
  }, []);

  const changePage = async (page) => {
    if (!getFromLocalStorage(`movies_p${page}`)) {
      loadMovies(
        '/api/discover/movies',
        { type: 'movie', pg: `${page}` },
        ['movies_dis', `movies_dis${page}`]
      );
    } else {
      setMovies(getFromLocalStorage(`movies_dis${page}`));
    }
  };

  return (
    <Layout>
      <Container className="mt-2" fluid>
        <Row className="justify-content-center" noGutters>
          {movies ? (
            movies.results && <MovieCard movies={movies.results} />
          ) : (
            <Loading />
          )}
        </Row>
        <Pagination movies={movies} handleClick={changePage} />
      </Container>
    </Layout>
  );
}
