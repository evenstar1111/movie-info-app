import { SearchFiltersForm, SearchFiltersFormProps } from '@/components/forms';
import { PublicLayout } from '@/components/layouts';
import Pagination from '@/components/pagination';
import { ContentList } from '@/components/shared';
import { ContentTypes, TContentTypeWPageVal } from '@/constants';
import { searchCl, SearchResponse, SearchTvOrMovieQParams } from '@/interfaces/api';
import { Button, Container } from '@mui/material';
import Head from 'next/head';
import { ReactElement, useState } from 'react';
import Loading from '../components/loadingMsg';
import { NextPageWithLayout } from './_app';

const Search: NextPageWithLayout = () => {
   const [searchRes, setSearchRes] = useState<SearchResponse>();
   const [filters, setFilters] = useState<SearchTvOrMovieQParams>({
      type: ContentTypes.Movie,
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
         setSearchRes(res.data);
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
      <Container>
         <div id="search_page_collapse">
            <SearchFiltersForm onSubmit={onSearchFrmSubmit} defaultValues={filters} />
         </div>
         <Button onClick={() => toggleSearchCollapse()}>
            {searchBarOpen ? <span>&#9651;</span> : <span>&#9661;</span>}
         </Button>
      </Container>
   );

   const loadingComp = loading && <Loading />;

   return (
      <>
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
            <Container maxWidth={false}>
               <ContentList contents={searchRes?.results} type={filters.type as TContentTypeWPageVal} />
               <Pagination movies={searchRes} handleClick={changePage} />
            </Container>
         )}
      </>
   );
};

Search.getLayout = (page: ReactElement) => {
   return <PublicLayout>{page}</PublicLayout>;
};

export default Search;
