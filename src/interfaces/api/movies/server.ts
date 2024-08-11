import { axiosInst } from '@/interfaces/http-client';
import { RoutePaths } from '../constants';
import { DiscoverMoviesQParams } from './types';

export async function discoverMovies(query: DiscoverMoviesQParams) {
   return axiosInst.get(RoutePaths.DISCOVER_MOVIES, {
      params: {
         ...query,
      },
   });
}

export async function getMovieDetails(mId: string) {
   const path = RoutePaths.getContentDetlUrl('movie', mId);

   return axiosInst.get(path);
}

/**
 * Refactor as you go.
 *
 * common types
 *
 * common actions
 *
 * constants, common constants
 *
 *
 *
 */
