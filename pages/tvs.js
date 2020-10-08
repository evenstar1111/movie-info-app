import MovieCard from '../components/movie_card';
import Loading from '../components/loadingMsg';
import Error from '../components/error';
import Pagination from '../components/pagination';
import Layout from '../components/layout';
import {
  getFromLocalStorage,
  storeInLocalStorage,
} from '../actions/localStorageHelpers';
import { fetchPostReq } from '../actions/search';
import { Container, Row } from 'reactstrap';

export default class Tvs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tvs: {},
      loading: true,
      error: '',
    };

    this.loadTvs = this.loadTvs.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  async loadTvs(url, objData, locName) {
    const data = await fetchPostReq(url, objData);
    if (data.error) {
      return this.setState(() => ({ error: data.error }));
    }
    this.setState((state) => ({
      tvs: data,
    }));
    locName.map((lname) => storeInLocalStorage(lname, data));
  }

  changePage(page) {
    if (!getFromLocalStorage(`tvs_dis${page}`)) {
      this.loadTvs('/api/discover/tvs', { type: 'tv', pg: page }, [
        'tvs_dis',
        `tvs_dis${page}`,
      ]);
    } else {
      this.setState((state) => ({
        tvs: getFromLocalStorage(`tvs_dis${page}`),
      }));
    }
  }

  componentDidMount() {
    if (!discoveredTvs) {
      this.loadTvs('/api/discover/tvs', { type: 'tv' }, ['tvs_dis']);
    } else {
      this.setState({ tvs: discoveredTvs });
    }
    this.setState(() => ({ loading: false }));
  }

  render() {
    const { tvs, loading, error } = this.state;

    const loadingMsg = loading && <Loading />;
    const ErrorMsg = error && <Error error={error} />;
    const tvsRender = tvs && tvs.results && (
      <MovieCard movies={tvs.results} />
    );

    const dynamicPages = tvs && (
      <Pagination movies={tvs} handleClick={this.changePage} />
    );

    return (
      <Layout>
        <Container className="mt-2" fluid>
          <Row className="justify-content-center" noGutters>
            {loadingMsg}
            {ErrorMsg}
            {tvsRender}
          </Row>
          {dynamicPages}
        </Container>
      </Layout>
    );
  }
}

const discoveredTvs = getFromLocalStorage('tvs_dis');
