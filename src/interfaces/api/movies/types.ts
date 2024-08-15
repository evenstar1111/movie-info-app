import { Movie } from '@/types';
import { TMoviesSortByOptionValue } from '../constants';
import { CommonDiscoverQParams, ListsApiResponse } from '../shared.types';

export type DiscoverMoviesQParams = CommonDiscoverQParams<TMoviesSortByOptionValue> & {
   year?: number;
   with_cast?: string;
   with_crew?: string;
   with_people?: string;
   include_video?: boolean;
};

export type MovieListsResponse = ListsApiResponse<Movie>;
