import fetch from 'isomorphic-fetch';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { personDetUrl } from '../../externalApiUrls/index';
import { KEY } from '../../config';
import Loading from '../../components/loadingMsg';
import { Container, Jumbotron, Col, Row } from 'reactstrap';
import { image_base_lg, imdb_link_psn } from '../../config';

export default function PersonInfo({ details }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { back } = router;

  const loadingComponent = !details && <Loading />;

  const biography =
    details.biography.length > 300 ? (
      <>
        {isExpanded ? (
          details.biography
        ) : (
          <span>{details.biography.substr(0, 300)}...</span>
        )}
        <a
          role="button"
          className="text-primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'less' : 'more'}
        </a>
      </>
    ) : (
      details.biography
    );

  const info = (
    <Jumbotron className="text-dark bg-light">
      <Row className="flex-column flex-md-row align-items-center align-items-md-start">
        <Col className="col-9 col-md-auto mb-3  mb-md-0">
          <img
            src={`${image_base_lg}${details.profile_path}`}
            alt=""
            className="w-100"
          />
        </Col>
        <Col>
          <Row className="mb-3">
            <Col>
              <h2>{details.name}</h2>
              <p>
                <b>Biography:</b> {biography}
              </p>
              <p>
                <b>Department:</b> {details.known_for_department}
              </p>
              <p>
                <b>Birthday:</b> {details.birthday}
              </p>
              <p>
                <b>Birth Place:</b> {details.place_of_birth}
              </p>
              {details.deathday && (
                <p>
                  <b>Died on:</b> {details.deathday}
                </p>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="col-auto">
              <a
                href={`${imdb_link_psn}${details.imdb_id}`}
                className="btn btn-primary mr-2"
                target="_blank"
              >
                VIEW ON IMDB
              </a>
              {details.homepage && (
                <a
                  href={details.homepage}
                  className="btn btn-info mr-2"
                  target="_blank"
                >
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
  const { p_id } = params;
  const response = await fetch(personDetUrl(p_id, KEY));
  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: JSON.stringify(response.url) });
  }
  const data = await response.json();

  return {
    props: {
      details: data,
    },
  };
}
