import MovieCard from '../components/movie_card';
import Loading from '../components/loadingMsg';
import Error from '../components/error';
import Pagination from '../components/pagination';
import Layout from '../components/layout';
import {
  getFromSessionStorage,
  storeInsSessionStorage,
} from '../actions/localStorageHelpers';
import { fetchPostReq } from '../actions/search';
import { Container, Row } from 'reactstrap';
import Head from 'next/head';

export default class Tvs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tvs: {},
      loading: false,
      error: '',
    };

    this.loadTvs = this.loadTvs.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  async loadTvs(url, objData, locName) {
    const data = await fetchPostReq(url, objData);
    if (data.error) {
      return this.setState({ error: data.error });
    }
    this.setState({
      tvs: data,
    });
    locName.map((lname) => storeInsSessionStorage(lname, data));
  }

  changePage(page) {
    this.setState({ loading: true });
    if (!getFromSessionStorage(`tvs_dis${page}`)) {
      this.loadTvs('/api/discover/tvs', { type: 'tv', pg: page }, [
        'tvs_dis',
        `tvs_dis${page}`,
      ]);
    } else {
      this.setState({
        tvs: getFromSessionStorage(`tvs_dis${page}`),
      });
    }
    this.setState({ loading: false });
  }

  componentDidMount() {
    if (!getFromSessionStorage('tvs_dis')) {
      this.loadTvs('/api/discover/tvs', { type: 'tv' }, ['tvs_dis']);
    } else {
      this.setState({ tvs: getFromSessionStorage('tvs_dis') });
    }
  }

  render() {
    const { tvs, loading, error } = this.state;

    const loadingMsg = loading && <Loading />;
    const ErrorMsg = error && <Error error={error} />;
    const tvsRender = tvs && tvs.results && (
      <MovieCard movies={tvs.results} type="tv" />
    );

    const pageNumbers = tvs && (
      <Pagination movies={tvs} handleClick={this.changePage} />
    );

    return (
      <Layout>
        <Head>
          <title>Explore TV Shows</title>
          <meta
            name="description"
            content="browse popular tv shows and get details about them"
            key="tvs-page"
          />
        </Head>
        <Container className="mt-2" fluid>
          <Row className="justify-content-center" noGutters>
            {loadingMsg}
            {ErrorMsg}
            {tvsRender}
          </Row>
          {pageNumbers}
        </Container>
      </Layout>
    );
  }
}

const discoveredTvs = getFromSessionStorage('tvs_dis');
