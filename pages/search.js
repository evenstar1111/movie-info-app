import { Fragment, useState } from 'react';
import MovieCard from '../components/movie_card';
import {
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Collapse,
} from 'reactstrap';

import styles from '../styles/search_bar.module.scss';
import {
  searchMovies,
  storeInLocalStorage,
  getFromLocalStorage,
} from '../actions/search';

export default function Search() {
  const [movies, setMovies] = useState('');
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  const storedResult = getFromLocalStorage('movies_sch');
  const searchedTerm = getFromLocalStorage('sch_term');

  if (!movies && storedResult) {
    setMovies(storedResult);
  }
  if (!input && searchedTerm) {
    setInput(searchedTerm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await searchMovies(input);
    setMovies(data);
    storeInLocalStorage('movies_sch', data);
  };

  const searchBar = (
    <Container className={`${styles.srch_wpr} py-2`} fluid>
      <Collapse isOpen={isOpen} className={`${styles._collapse}`}>
        <div className="container-sm">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="search_fld" className="sr-only">
                Search Movies
              </Label>
              <Input
                id="search_fld"
                className="form-control"
                value={input}
                placeholder="search movies by title"
                onChange={(e) => {
                  setInput(e.target.value);
                  storeInLocalStorage('sch_term', e.target.value);
                }}
              />
            </FormGroup>
            <Button className="btn-warning">Search Movies</Button>
          </Form>
        </div>
      </Collapse>
      <Button
        block
        className={`${styles._button} btn-sm`}
        color="secondary"
        onClick={toggle}
      >
        {isOpen ? <span>&#9651;</span> : <span>&#9661;</span>}
      </Button>
    </Container>
  );

  return (
    <Fragment>
      {searchBar}
      <Container className="mt-2" fluid>
        <Row className="justify-content-center" noGutters>
          {movies
            ? movies.results && <MovieCard movies={movies.results} />
            : ''}
        </Row>
      </Container>
    </Fragment>
  );
}
