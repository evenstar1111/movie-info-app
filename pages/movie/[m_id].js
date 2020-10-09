import { useRouter } from 'next/router';
import { useState } from 'react';
import fetch from 'isomorphic-fetch';
import Loading from '../../components/loadingMsg';
import { Container, Col, Row, Jumbotron } from 'reactstrap';
import { image_base, imdb_link_tmov, KEY } from '../../config';
import { movieDetUrl } from '../../externalApiUrls';

export default function MovieInfo({ details }) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const overview =
    details.overview.length > 300 ? (
      <>
        {isExpanded ? details.overview : details.overview.substr(0, 300)}
        <a
          role="button"
          className="text-primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'less' : 'more'}
        </a>
      </>
    ) : (
      details.overview
    );

  const info = details && (
    <Jumbotron className="text-dark bg-light">
      <Row className="flex-column flex-sm-row align-items-center align-items-sm-start">
        <Col className="col-auto mb-3  mb-sm-0">
          <img src={`${image_base}${details.poster_path}`} alt="" />
        </Col>
        <Col>
          <Row className="mb-3">
            <Col>
              <h2>{details.title}</h2>
              <p>
                <b>Overview:</b> {overview}
              </p>
              <p>
                <b>In Genres:</b>{' '}
                {details.genres.map((g) => (
                  <span key={g.id}>{g.name},&nbsp;</span>
                ))}
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
              <a
                href={`${imdb_link_tmov}${details.imdb_id}`}
                className="btn btn-primary mr-2"
                target="_blank"
              >
                VIEW ON IMDB
              </a>
              <button
                className="btn btn-secondary"
                onClick={() => router.back()}
              >
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

export async function getServerSideProps({ params }) {
  const { m_id } = params;
  const response = await fetch(movieDetUrl(m_id, KEY));
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
