import { ContentListResponse, Tv } from '@/types';
import { TTvsSortByOptionValue } from '../constants';
import { CommonDiscoverQParams } from '../shared.types';

export type DiscoverTvsQParams = CommonDiscoverQParams<TTvsSortByOptionValue> & {
   first_air_date_year?: string;
   'first_air_date.gte'?: string;
   'first_air_date.lte'?: string;
};
export type DiscoverTvsQParamsKey = keyof DiscoverTvsQParams;

export type TvListsResponse = ContentListResponse<Tv>;
