import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { findMovieDetail } from '../../actions/search';
import Loading from '../../components/loadingMsg';
import { Container, Col, Row } from 'reactstrap';
import { image_base } from '../../config_file';

export default function MovieInfo() {
  const [movie, setMovie] = useState();
  const { query } = useRouter();
  const { slug } = query;

  const detail = movie && (
    <Row noGutters>
      <Col className="d-flex col-12 col-md-4 justify-content-center mb-2 mb-sm-0">
        {movie.poster_path && (
          <img src={`${image_base}${movie.poster_path}`} />
        )}
      </Col>
      <Col className="col-12 col-md-8">
        <h3 className="font-weight-bolder mb-3">
          {movie.original_title}
        </h3>
        <p className="smalll">
          <span className="font-weight-bold">Overview :&nbsp;</span>{' '}
          {movie.overview}
        </p>
        <p className="small">Release :&nbsp; {movie.release_date}</p>
        <p className="small">
          Rating :&nbsp; {movie.vote_average}/10
        </p>
      </Col>
    </Row>
  );

  const loadingCom = !movie && <Loading />;

  useEffect(() => {
    async function callLocalApi() {
      const data = await findMovieDetail(slug[0]);
      setMovie(data);
      console.log(data);
    }

    callLocalApi();
  }, []);

  return (
    <Container fluid className="mt-3">
      {detail}
      {loadingCom}
    </Container>
  );
}
