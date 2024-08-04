import fetch from 'isomorphic-fetch';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { collecDetUrl } from '../../externalApiUrls/index';
import { KEY, image_base_lg } from '../../config';
import Loading from '../../components/loadingMsg';
import { Container, Jumbotron, Col, Row } from 'reactstrap';

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
               {details.poster_path && <img src={`${image_base_lg}${details.poster_path}`} alt="" className="w-100" />}
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
                  </Col>
               </Row>
               <Row>
                  <Col className="col-auto">
                     {details.homepage && (
                        <a href={details.homepage} className="btn btn-info mr-2" target="_blank">
                           OFFICIAL HOMEPAGE
                        </a>
                     )}
                     <button className="btn btn-secondary" onClick={() => back()}>
                        BACK
                     </button>
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
   const { col_id } = params;
   const response = await fetch(collecDetUrl(col_id, KEY));
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
