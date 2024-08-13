import { axiosInstForClient } from '@/interfaces/http-client';
import { DiscoverTvsQParams, TvListsResponse } from './types';

export async function discoverTvsCl(data: DiscoverTvsQParams) {
   return axiosInstForClient.post<TvListsResponse>('discover/tvs', { ...data });
}
