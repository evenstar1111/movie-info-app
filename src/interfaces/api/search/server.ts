import { axiosInst } from '@/interfaces/http-client';
import { SearchTvOrMovieQParams } from './types';

export async function search({ type, ...data }: SearchTvOrMovieQParams) {
   return axiosInst.get(`search/${type}`, {
      params: {
         ...data,
      },
   });
}
