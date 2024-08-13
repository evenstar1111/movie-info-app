import { Movie, Tv } from '@/types';

export type Props = {
   content: Partial<Movie> & Partial<Tv>;
   detlUrlPrefix: string;
};
