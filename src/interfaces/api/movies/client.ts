import { axiosInstForClient } from '@/interfaces/http-client';
import { DiscoverMoviesQParams } from './types';

export async function discoverMoviesCl(data: DiscoverMoviesQParams) {
   return axiosInstForClient.post('discover/movies', { ...data });
}
