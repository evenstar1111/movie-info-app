import { Fragment, useState, useEffect } from 'react';
import MovieCard from '../components/movie_card';
import Loading from '../components/loadingMsg';
import {
  storeInLocalStorage,
  getFromLocalStorage,
} from '../actions/localStorageHelpers';
import { fetchPostReq } from '../actions/search';
import fetch from 'isomorphic-fetch';
import {
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from 'reactstrap';
import styles from '../styles/search_bar.module.scss';

export default function Search() {
  const [isOpen, setIsOpen] = useState(true);
  const [values, setValues] = useState({
    type: '',
    kw: '',
    movies: '',
    loading: false,
    error: false,
    message: '',
  });

  const { type, kw, movies, loading, error, message } = values;

  const setFormValue = (name, e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
    storeInLocalStorage(`${name}`, e.target.value);
  };

  // useEffect(() => {
  //   let storedResult, searchedTerm, searchedType;
  //   function useDataFromLocalStorage() {
  //     const storedResult = getFromLocalStorage('movies_sch');
  //     const searchedTerm = getFromLocalStorage('kw');
  //     const searchedType = getFromLocalStorage('type');
  //     return { storedResult, searchedTerm, searchedType } && true;
  //   }
  //   if (useDataFromLocalStorage()) {
  //     setValues({
  //       ...values,
  //       movies: storedResult,
  //       type: searchedType,
  //       kw: searchedTerm,
  //     });
  //   }
  //   // if (!kw && searchedTerm) {
  //   //   setValues({ ...values, kw: searchedTerm });
  //   // }
  //   // if (!type && searchedType) {
  //   //   setValues({ ...values, type: searchedType });
  //   // }
  // }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setValues({ ...values, loading: true });
      const objData = { type: type, kw: kw };
      const data = await fetchPostReq('/api/search', objData);
      if (data.error) {
        return setValues({
          ...values,
          error: true,
          message: data.error,
          loading: false,
        });
      }
      setValues({ ...values, loading: false, movies: data });
      storeInLocalStorage('movies_sch', data);
    } catch (e) {
      return console.log(e.message);
    }
  };

  const searchBar = (
    <Container className={`${styles.srch_wpr} py-2`} fluid>
      <div
        id="search_page_collapse"
        className={`${styles._collapse} collapse show`}
      >
        <div className="container-sm">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="search_fld" className="sr-only">
                Search Movies
              </Label>
              <Input
                id="search_fld"
                className="form-control"
                value={kw}
                placeholder="search movies by title"
                onChange={(e) => setFormValue('kw', e)}
              />
            </FormGroup>
            <div className="form-row">
              <div className="form-group col-5 col-sm-3">
                <label htmlFor="type_select" className="sr-only">
                  Select a Scope
                </label>
                <select
                  className="custom-select custom-select-sm"
                  id="type_select"
                  value={type}
                  onChange={(e) => setFormValue('type', e)}
                >
                  <option value="movie">movie</option>
                  <option value="tv">tv</option>
                  <option value="person">person</option>
                  <option value="collection">collection</option>
                  <option value="multi">multi</option>
                </select>
              </div>
            </div>
            <Button className="btn-warning">Search Movies</Button>
          </Form>
        </div>
      </div>
      <Button
        block
        className={`${styles._button} btn-sm`}
        color="secondary"
        onClick={() => collapse_searchbar(isOpen, setIsOpen)}
      >
        {isOpen ? <span>&#9651;</span> : <span>&#9661;</span>}
      </Button>
    </Container>
  );

  const loadingComp = loading && <Loading />;
  const errorComp = error && (
    <div className="alert alert-danger" role="alert">
      {message}
      <button
        type="button"
        className="close mb-3"
        aria-label="Close"
        onClick={() => setValues({ ...values, error: false })}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  return (
    <Fragment>
      {searchBar}
      {!loading && (
        <Container className="mt-2" fluid>
          {loadingComp}
          {errorComp}
          <Row className="justify-content-center" noGutters>
            {movies
              ? movies.results && <MovieCard movies={movies.results} />
              : ''}
          </Row>
        </Container>
      )}
    </Fragment>
  );
}

function collapse_searchbar(isOpen, setIsOpen) {
  const collapse = document.getElementById('search_page_collapse');
  if (collapse.style.height === '0px') {
    collapse.style.height = '14rem';
  } else collapse.style.height = 0;
  setIsOpen(!isOpen);
}
