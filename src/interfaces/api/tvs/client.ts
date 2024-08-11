import { axiosInstForClient } from '@/interfaces/http-client';
import { DiscoverTvsQParams } from './types';

export async function discoverTvsCl(data: DiscoverTvsQParams) {
   return axiosInstForClient.post('discover/tvs', { ...data });
}
