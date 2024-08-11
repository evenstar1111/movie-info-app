import { SearchFiltersForm, SearchFiltersFormProps } from '@/components/forms';
import MovieCard from '@/components/movie_card';
import Pagination from '@/components/pagination';
import { searchCl, SearchContentType, SearchTvOrMovieQParams } from '@/interfaces/api';
import { Container } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { Button, Row } from 'reactstrap';
import Layout from '../components/layout';
import Loading from '../components/loadingMsg';
import styles from '../styles/search_bar.module.scss';

export default function Search() {
   const [result, setResult] = useState<any>();
   const [filters, setFilters] = useState<SearchTvOrMovieQParams>({
      type: SearchContentType.Movie,
      query: '',
   });
   const [searchBarOpen, setSearchBarOpen] = useState<boolean>(true);
   const [loading, setLoading] = useState<boolean>(false);

   const toggleSearchCollapse = () => {
      setSearchBarOpen((prevState) => !prevState);
   };

   const startSearch = async (data: SearchTvOrMovieQParams) => {
      if (loading) return;

      setLoading(true);

      const res = await searchCl({
         ...data,
      });

      if (res.status === 200) {
         setResult(res.data);
      }
      setLoading(false);
   };

   const onSearchFrmSubmit: SearchFiltersFormProps['onSubmit'] = (data) => {
      startSearch(data);
      setFilters({ ...data });
   };

   const changePage = async (page: number) => {
      startSearch({
         ...filters,
         page,
      });
   };

   const searchBar = (
      <Container className={`${styles.srch_wpr} py-2`}>
         <div id="search_page_collapse" className={`${styles._collapse} collapse ${searchBarOpen ? 'show' : 'hide'}`}>
            <SearchFiltersForm onSubmit={onSearchFrmSubmit} defaultValues={filters} />
         </div>
         <Button block className={`${styles._button} btn-sm`} color="secondary" onClick={() => toggleSearchCollapse()}>
            {searchBarOpen ? <span>&#9651;</span> : <span>&#9661;</span>}
         </Button>
      </Container>
   );

   const loadingComp = loading && <Loading />;

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
         {!loading && (
            <Container className="mt-2">
               <Row className="justify-content-center" noGutters>
                  {result?.results ? <MovieCard movies={result.results} type={filters.type} /> : ''}
               </Row>
               <Pagination movies={result} handleClick={changePage} />
            </Container>
         )}
      </Layout>
   );
}
