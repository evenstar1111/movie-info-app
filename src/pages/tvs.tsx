import { discoverTvsCl, DiscoverTvsQParams } from '@/interfaces/api';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import Error from '../components/error';
import Layout from '../components/layout';
import Loading from '../components/loadingMsg';
import MovieCard from '../components/movie_card';
import Pagination from '../components/pagination';

type State = {
   tvs: Partial<Record<string, any>>;
   loading: boolean;
   error: string;
};

export default function Tvs() {
   const [state, setState] = useState<State>({
      tvs: {},
      loading: false,
      error: '',
   });
   const [filters, setFilters] = useState<DiscoverTvsQParams>({});

   const changePage = (page: number) => {
      setFilters((prevState) => ({
         ...prevState,
         page,
      }));
   };

   useEffect(() => {
      setState((prevState) => ({
         ...prevState,
         loading: true,
      }));

      getTvs();

      async function getTvs() {
         const res = await discoverTvsCl({
            ...filters,
         });

         if (res.status === 200) {
            setState({
               loading: false,
               tvs: res.data,
               error: '',
            });
            return;
         }

         setState((prevState) => ({
            ...prevState,
            loading: false,
            error: 'Failed to load the tvs',
         }));
      }
   }, [filters]);

   const loadingMsg = state.loading && <Loading />;
   const ErrorMsg = state.error && <Error error={state.error} />;
   const tvsRender = state.tvs && state.tvs.results && <MovieCard movies={state.tvs.results} type="tv" />;

   const pageNumbers = state.tvs && <Pagination movies={state.tvs} handleClick={changePage} />;

   return (
      <Layout>
         <Head>
            <title>Explore TV Shows</title>
            <meta name="description" content="browse popular tv shows and get details about them" key="tvs-page" />
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
