import { ContentListResponse, Movie } from '@/types';
import { TMoviesSortByOptionValue } from '../constants';
import { CommonDiscoverQParams } from '../shared.types';

export type DiscoverMoviesQParams = CommonDiscoverQParams<TMoviesSortByOptionValue> & {
   year?: string;
   with_cast?: string;
   with_crew?: string;
   with_people?: string;
   include_video?: boolean;
   primary_release_year?: string;
   // 'primary_release_date.gte'?: string;
   // 'primary_release_date.lte'?: string; //dot(.) symbol might be a problem
};
export type DiscoverMoviesQParamKey = keyof DiscoverMoviesQParams;

export type MovieListsResponse = ContentListResponse<Movie>;
