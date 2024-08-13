import { PublicLayout } from '@/components/layouts';
import { ContentList } from '@/components/shared';
import { ContentTypes } from '@/constants';
import { discoverTvsCl, DiscoverTvsQParams, TvListsResponse } from '@/interfaces/api';
import { Container } from '@mui/material';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import Pagination from '../components/pagination';
import { NextPageWithLayout } from './_app';

const Tvs: NextPageWithLayout = () => {
   const [tvsRes, setTvsRes] = useState<TvListsResponse>();
   const [filters, setFilters] = useState<DiscoverTvsQParams>({});

   const changePage = (page: number) => {
      setFilters((prevState) => ({
         ...prevState,
         page,
      }));
   };

   useEffect(() => {
      getTvs();

      async function getTvs() {
         const res = await discoverTvsCl({
            ...filters,
         });

         if (res.status === 200) {
            setTvsRes(res.data);
            return;
         }
      }
   }, [filters]);

   return (
      <>
         <Head>
            <title>Explore TV Shows</title>
            <meta name="description" content="browse popular tv shows and get details about them" key="tvs-page" />
         </Head>
         <Container maxWidth={false}>
            <ContentList contents={tvsRes?.results} type={ContentTypes.Tv} />
            <Pagination movies={tvsRes} handleClick={changePage} />
         </Container>
      </>
   );
};

Tvs.getLayout = (page: ReactElement) => {
   return <PublicLayout>{page}</PublicLayout>;
};

export default Tvs;
