import { axiosInstForClient } from '@/interfaces/http-client';
import { SearchTvOrMovieQParams } from './types';

export async function searchCl(data: SearchTvOrMovieQParams) {
   return axiosInstForClient.post('search', { ...data });
}
