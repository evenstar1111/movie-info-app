import fetch from 'isomorphic-fetch';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Col, Container, Jumbotron, Row } from 'reactstrap';
import Loading from '../../components/loadingMsg';
import { image_base_lg, KEY } from '../../config';
import { tvDetUrl } from '../../externalApiUrls/index';

export default function PersonInfo({ details }) {
   const [isExpanded, setIsExpanded] = useState(false);
   const router = useRouter();
   const { back } = router;

   const loadingComponent = !details && <Loading />;

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

   const info = (
      <Jumbotron className="text-dark bg-light">
         <Row className="flex-column flex-md-row align-items-center align-items-md-start">
            <Col className="col-9 col-md-auto mb-3  mb-md-0">
               {details.poster_path && (
                  <Image src={`${image_base_lg}${details.poster_path}`} alt="" className="w-100" />
               )}
            </Col>
            <Col>
               <Row className="mb-3">
                  <Col>
                     <h2>{details.name}</h2>
                     {details.overview && (
                        <p>
                           <b>Overview:</b> {overview}
                        </p>
                     )}
                     <p>
                        <b>In Genres:</b>{' '}
                        {details.genres.map((g) => (
                           <span key={g.id}>{g.name},&nbsp;</span>
                        ))}
                     </p>
                     <p>
                        <b>Created By:</b>{' '}
                        {details.created_by.map((g) => (
                           <span key={g.id}>{g.name},&nbsp;</span>
                        ))}
                     </p>
                     <p>
                        <b>First Air Date:</b> {details.first_air_date}
                     </p>
                     <p>
                        <b>Last Air Date:</b> {details.last_air_date}
                     </p>
                     <p>
                        <b>Total Seasons:</b> {details.number_of_seasons}
                     </p>
                     <p>
                        <b>Total Episodes:</b> {details.number_of_episodes}
                     </p>
                  </Col>
               </Row>
               <Row>
                  <Col className="col-auto">
                     {details.homepage && (
                        <a href={details.homepage} className="btn btn-info mr-2" target="_blank">
                           OFFICIAL HOMEPAGE
                        </a>
                     )}
                     <a role="button" className="btn btn-secondary" onClick={() => back()}>
                        BACK
                     </a>
                  </Col>
               </Row>
            </Col>
         </Row>
      </Jumbotron>
   );

   return (
      <Container fluid className="mt-3">
         {info}
         {loadingComponent}
      </Container>
   );
}

export async function getServerSideProps({ params }) {
   const { tv_id } = params;
   const response = await fetch(tvDetUrl(tv_id, KEY));
   if (!response.ok) {
      return res.status(response.status).json({ error: JSON.stringify(response.url) });
   }
   const data = await response.json();

   return {
      props: {
         details: data,
      },
   };
}
