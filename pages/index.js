import { useRouter } from 'next/router';
import { Container, Row } from 'reactstrap';
import MovieCard from '../components/movie_card';
import { discoverMovies } from '../actions/search';
import Loading from '../components/loadingMsg';
import Pagination from '../components/pagination';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function loadMovies() {
      const data = await discoverMovies();
      setMovies(data);
    }

    loadMovies();
    router.prefetch('/search');
  }, []);

  const changePage = async (page) => {
    const data = await discoverMovies(page);
    setMovies(data);
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
