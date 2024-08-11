import { TMoviesSortByOptionValue } from '../constants';
import { CommonDiscoverQParams } from '../shared.types';

export type DiscoverMoviesQParams = CommonDiscoverQParams<TMoviesSortByOptionValue> & {
   year?: number;
   with_cast?: string;
   with_crew?: string;
   with_people?: string;
   include_video?: boolean;
};

export enum MoviesGenres {
   Action = 'Action',
   Adventure = 'Adventure',
   Animation = 'Animation',
   Comedy = 'Comedy',
   Crime = 'Crime',
   Documentary = 'Documentary',
   Drama = 'Drama',
   Family = 'Family',
   Fantasy = 'Fantasy',
   History = 'History',
   Horror = 'Horror',
   Music = 'Music',
   Mystery = 'Mystery',
   Romance = 'Romance',
   ScienceFiction = 'Science Fiction',
   TVMovie = 'TV Movie',
   Thriller = 'Thriller',
   War = 'War',
   Western = 'Western',
}
