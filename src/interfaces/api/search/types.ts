import { type TContentTypeVal } from '@/constants';
import { CommonSearchQParams, ListsApiResponse } from '../shared.types';

export type SearchTvOrMovieQParams = CommonSearchQParams & {
   type: TContentTypeVal;
   year?: number;
};

export type SearchResponse = ListsApiResponse;
