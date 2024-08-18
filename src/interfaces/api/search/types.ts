import { type TContentTypeVal } from '@/constants';
import { ContentListResponse } from '@/types';
import { CommonSearchQParams } from '../shared.types';

export type SearchTvOrMovieQParams = CommonSearchQParams & {
   type: TContentTypeVal;
   year?: number;
};

export type SearchResponse = ContentListResponse;
