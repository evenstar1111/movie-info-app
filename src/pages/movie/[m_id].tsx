import { getMovieDetails } from '@/interfaces/api';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Container, Jumbotron, Row } from 'reactstrap';
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
      <Jumbotron className="text-dark bg-light">
         <Row className="flex-column flex-md-row align-items-center align-items-md-start">
            <Col className="col-9 col-md-auto mb-3  mb-md-0">
               {/* <Image src={`${image_base_lg}${details.poster_path}`} alt="" className="w-100" /> */}
            </Col>
            <Col>
               <Row className="mb-3">
                  <Col>
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
                  </Col>
               </Row>
               <Row>
                  <Col className="col-auto">
                     <a href={`${imdb_link_tmov}${details.imdb_id}`} className="btn btn-primary mr-2" target="_blank">
                        VIEW ON IMDB
                     </a>
                     <button className="btn btn-secondary" onClick={() => router.back()}>
                        BACK
                     </button>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Jumbotron>
   );

   const loadingCom = !details && <Loading />;

   return (
      <Container fluid className="mt-3">
         {info}
         {loadingCom}
      </Container>
   );
}
