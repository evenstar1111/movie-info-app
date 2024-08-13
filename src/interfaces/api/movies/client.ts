import { axiosInstForClient } from '@/interfaces/http-client';
import { DiscoverMoviesQParams, MovieListsResponse } from './types';

export async function discoverMoviesCl(data: DiscoverMoviesQParams) {
   return axiosInstForClient.post<MovieListsResponse>('discover/movies', { ...data });
}
