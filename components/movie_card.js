import { Fragment } from 'react';
import { Jumbotron, Col, Card, CardImg, CardBody } from 'reactstrap';
import { image_base } from '../config_file';
import DummyPoster from '../components/dummyPoster';
import { useRouter } from 'next/router';

export default function MovieCard({ movies }) {
  const { push } = useRouter();
  const cards =
    movies &&
    movies.map((movie) => (
      <Col key={movie.id} className="col-auto col-sm-auto mb-2">
        <Card onClick={() => push(`/movie/${movie.id}`)}>
          {movie.poster_path ? (
            <CardImg top src={`${image_base}${movie.poster_path}`} />
          ) : (
            <DummyPoster />
          )}
          <CardBody>
            <p className="text-muted small mb-0">
              {movie.title.length > 27 ? (
                <span>{movie.title.substr(0, 28)}...</span>
              ) : (
                <span>{movie.title}</span>
              )}
            </p>
            <p className="small mb-0">votes: {movie.vote_count}</p>
            <p className="small mb-0">
              Rating: {movie.vote_average}/10
            </p>
          </CardBody>
        </Card>
      </Col>
    ));

  const notFound = !movies && (
    <Jumbotron>
      <h1 className="display-2">could not find anything</h1>
    </Jumbotron>
  );
  return (
    <Fragment>
      {cards}
      {notFound}
    </Fragment>
  );
}
