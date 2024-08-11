import DummyPoster from '@/components/dummyPoster';
import { Button, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { image_base } from '../config';

export default function MovieCard({ movies, type }) {
   const { push } = useRouter();
   const cards =
      movies &&
      movies.map((movie) => {
         const title = movie.title
            ? movie.title.length > 28
               ? `${movie.title.substr(0, 28)}`
               : `${movie.title}`
            : movie.name && `${movie.name}`;

         const poster = movie.poster_path
            ? `${image_base}${movie.poster_path}`
            : movie.profile_path && `${image_base}${movie.profile_path}`;

         const vote = movie.vote_count ? `vote : ${movie.vote_count}` : null;

         const known_for = movie.known_for && movie.known_for[0] && `Known_for: ${movie.known_for[0].title}`;

         const rating = movie.vote_average ? `rating : ${movie.vote_average}` : null;

         return (
            <div key={movie.id} className="col-auto col-sm-auto mb-2">
               <Card className="bg-light text-dark">
                  {poster ? (
                     <Image
                        width={100}
                        height={100}
                        top
                        src={`${poster}`}
                        alt={`${movie.poster_path ? movie.poster_path.slice(1) : movie.profile_path.slice(1)} `}
                     />
                  ) : (
                     <DummyPoster />
                  )}
                  <CardContent>
                     {title && <p className="text-muted small mb-0">{title}</p>}

                     <p className="small mb-0">{movie.release_date}</p>
                     {vote && <p className="small mb-0">{vote}</p>}
                     {rating && <p className="small mb-0">{rating}/10</p>}
                     {known_for && <p className="small mb-0">{known_for}</p>}
                     {type === 'movie' && <GotoDetails handleClick={() => push(`/movie/${movie.id}`)} />}
                     {type === 'tv' && <GotoDetails handleClick={() => push(`/tv/${movie.id}`)} />}
                     {type === 'person' && <GotoDetails handleClick={() => push(`/person/${movie.id}`)} />}
                     {type === 'collection' && <GotoDetails handleClick={() => push(`/collection/${movie.id}`)} />}
                  </CardContent>
               </Card>
            </div>
         );
      });

   const notFound = !movies && (
      <div>
         <h1 className="display-2">could not find anything</h1>
      </div>
   );
   return (
      <Fragment>
         {cards}
         {notFound}
      </Fragment>
   );
}

function GotoDetails({ handleClick }) {
   return (
      <>
         <Button color="primary" className="btn btn-sm btn-block mt-2" onClick={handleClick}>
            VIEW DETAILS
         </Button>
      </>
   );
}
