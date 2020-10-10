import MovieCard from '../components/movie_card';
import Layout from '../components/layout';
import {
  storeInsSessionStorage,
  getFromSessionStorage,
} from '../actions/localStorageHelpers';
import { fetchPostReq } from '../actions/search';
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
import Head from 'next/head';
import Loading from '../components/loadingMsg';

export default class Search extends React.Component {
  state = {
    isOpen: true,
    values: {
      type: 'movie',
      kw: '',
      movies: '',
      loading: '',
      error: '',
      message: '',
    },
  };
  setFormInputValue = (name, e) => {
    this.setState({
      values: {
        ...this.state.values,
        error: false,
        [name]: e.target.value,
      },
    });
  };

  componentDidMount() {
    this.toggleSearchCollapse = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    this.closeErrorMsg = () => {
      this.setState({ values: { ...this.state.values, error: false } });
    };

    this.handleSubmit = async (e) => {
      this.setState({ values: { ...this.state.values, loading: true } });

      const { type, kw } = this.state.values;
      try {
        e.preventDefault();
        const objData = { type: type, kw: kw };
        const data = await fetchPostReq('/api/search', objData);
        if (data.error) {
          return this.setState({
            values: {
              ...this.state.values,
              error: true,
              message: data.error,
              loading: false,
            },
          });
        }
        this.setState({
          values: { ...this.state.values, movies: data },
        });
        storeInsSessionStorage('search_result', data);
        storeInsSessionStorage('type', type);
        storeInsSessionStorage('kw', kw);
      } catch (e) {
        return console.log(e.message);
      }
      this.setState({
        values: { ...this.state.values, loading: false },
      });
    };

    //check from local storage
    const storedResult = getFromSessionStorage('search_result');
    const searchedTerm = getFromSessionStorage('kw');
    const searchedType = getFromSessionStorage('type');

    if (storedResult) {
      this.setState({
        values: {
          ...this.state.values,
          type: searchedType,
          kw: searchedTerm,
          movies: storedResult,
        },
      });
    }
  }

  render() {
    const {
      movies,
      loading,
      error,
      message,
      kw,
      type,
    } = this.state.values;
    const { isOpen } = this.state;

    const formDisabled = loading ? true : false;
    const searchBar = (
      <Container className={`${styles.srch_wpr} py-2`} fluid>
        <div
          id="search_page_collapse"
          className={`${styles._collapse} collapse ${
            isOpen ? 'show' : 'hide'
          }`}
        >
          <div className="container-sm">
            <Form onSubmit={this.handleSubmit} disabled={formDisabled}>
              <FormGroup>
                <Label htmlFor="search_fld" className="sr-only">
                  Search Movies
                </Label>
                <Input
                  id="search_fld"
                  className="form-control"
                  value={kw}
                  placeholder="search movies by title"
                  onChange={(e) => this.setFormInputValue('kw', e)}
                  required
                  autoFocus
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
                    onChange={(e) => this.setFormInputValue('type', e)}
                  >
                    <option value="movie">movie</option>
                    <option value="tv">tv</option>
                    <option value="person">person</option>
                    <option value="collection">collection</option>
                  </select>
                </div>
              </div>
              <Button className="btn-warning btn-sm">SEARCH</Button>
            </Form>
          </div>
        </div>
        <Button
          block
          className={`${styles._button} btn-sm`}
          color="secondary"
          onClick={() => this.toggleSearchCollapse()}
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
          onClick={this.closeErrorMsg}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );

    return (
      <Layout>
        <Head>
          <title>Search Movies, TVs, Persons & Collections</title>
          <meta
            name="description"
            content="Search your favorite movies, tv shows, people and collection, view overview, biography & more."
            key="search-page"
          />
        </Head>
        {searchBar}
        {loadingComp}
        {errorComp}
        {!loading && (
          <Container className="mt-2" fluid>
            <Row className="justify-content-center" noGutters>
              {movies
                ? movies.results && (
                    <MovieCard movies={movies.results} type={type} />
                  )
                : ''}
            </Row>
          </Container>
        )}
      </Layout>
    );
  }
}
