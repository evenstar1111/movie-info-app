import { getMovieDetails } from '@/interfaces/api';
import { Container } from '@mui/material';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '../../components/loadingMsg';
import { imdb_link_tmov } from '../../config';

export const getServerSideProps = async function ({ params, res }) {
   const m_id = (params?.m_id ?? '') as string;
   const response = await getMovieDetails(m_id);

   if (response.status !== 200) {
      res.writeHead(response.status, 'Could not load movie');
      res.end();
   }

   return {
      props: {
         details: response.data,
      },
   };
} satisfies GetServerSideProps<{ details: any }>;

export default function MovieInfo({ details }: InferGetServerSidePropsType<typeof getServerSideProps>) {
   const router = useRouter();
   const [isExpanded, setIsExpanded] = useState(false);

   const overview =
      details.overview.length > 300 ? (
         <>
            {isExpanded ? details.overview : <span>{details.overview.substr(0, 300)}...</span>}
            <a role="button" className="text-primary" onClick={() => setIsExpanded(!isExpanded)}>
               {isExpanded ? 'less' : 'more'}
            </a>
         </>
      ) : (
         details.overview
      );

   const info = details && (
      <div className="text-dark bg-light">
         <div className="flex-column flex-md-row align-items-center align-items-md-start">
            <div className="col-9 col-md-auto mb-3  mb-md-0">
               {/* <Image src={`${image_base_lg}${details.poster_path}`} alt="" className="w-100" /> */}
            </div>
            <div>
               <div className="mb-3">
                  <div>
                     <h2>{details.title}</h2>
                     <p>
                        <b>Overview:</b> {overview}
                     </p>
                     <p>
                        <b>In Genres:</b> {details.genres.map((g: { name: any }) => `${g.name}, `)}
                     </p>
                     <p>
                        <b>Release Date:</b> {details.release_date}
                     </p>
                     <p>
                        <b>Rating:</b> {details.vote_average}
                     </p>
                     <p>
                        <b>Total Votes:</b> {details.vote_count}
                     </p>
                  </div>
               </div>
               <div>
                  <div className="col-auto">
                     <a href={`${imdb_link_tmov}${details.imdb_id}`} className="btn btn-primary mr-2" target="_blank">
                        VIEW ON IMDB
                     </a>
                     <button className="btn btn-secondary" onClick={() => router.back()}>
                        BACK
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );

   const loadingCom = !details && <Loading />;

   return (
      <Container className="mt-3">
         {info}
         {loadingCom}
      </Container>
   );
}
