import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchPostReq } from '../../actions/search';
import Loading from '../../components/loadingMsg';
import { Container, Col, Row, Jumbotron } from 'reactstrap';
import { image_base, imdb_link_tmov } from '../../config';

export default function MovieInfo() {
  const router = useRouter();
  const { m_id } = router.query;
  const [details, setDetails] = useState();

  useEffect(() => {
    async function callLocalApi() {
      if (m_id) {
        const data = await fetchPostReq('/api/movie', { m_id });
        if (data.error) {
          return console.error(data.error);
        }
        setDetails(data);
      } else {
        return;
      }
    }

    callLocalApi();
  }, []);

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
                <b>Overview:</b> {details.overview}
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
