import { axiosInst } from '@/interfaces/http-client';
import { RoutePaths } from '../constants';
import { DiscoverTvsQParams } from './types';

export async function discoverTvs(query: DiscoverTvsQParams) {
   return axiosInst.get(RoutePaths.DISCOVER_TVS, {
      params: {
         ...query,
      },
   });
}

export async function getTvDetails(tId: string) {
   const path = RoutePaths.getContentDetlUrl('tv', tId);

   return axiosInst.get(path);
}
