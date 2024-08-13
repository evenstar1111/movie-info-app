import { axiosInstForClient } from '@/interfaces/http-client';
import { SearchResponse, SearchTvOrMovieQParams } from './types';

export async function searchCl(data: SearchTvOrMovieQParams) {
   return axiosInstForClient.post<SearchResponse>('search', { ...data });
}
