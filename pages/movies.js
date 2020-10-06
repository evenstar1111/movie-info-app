import MovieCard from '../components/movie_card';
import Loading from '../components/loadingMsg';
import Pagination from '../components/pagination';
import {
  discoverMovies,
  getFromLocalStorage,
  storeInLocalStorage,
} from '../actions/search';
import { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';

export default function Home() {
  const [movies, setMovies] = useState();

  const discoveredMovies = getFromLocalStorage('movies_dis');

  useEffect(() => {
    async function loadMovies() {
      const data = await discoverMovies();
      setMovies(data);
      storeInLocalStorage('movies_dis', data);
    }
    if (!discoveredMovies) {
      loadMovies();
    } else {
      setMovies(discoveredMovies);
    }
  }, []);

  const changePage = async (page) => {
    if (!getFromLocalStorage(`movies_p${page}`)) {
      const data = await discoverMovies(page);
      setMovies(data);
      storeInLocalStorage(`movies_p${page}`, data);
    } else {
      setMovies(getFromLocalStorage(`movies_p${page}`));
    }
  };

  return (
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
  );
}
