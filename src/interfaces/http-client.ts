import { tmdbConfig } from '@/config';
import axios from 'axios';

export const axiosInst = axios.create({
   baseURL: tmdbConfig.baseUrl,
   params: {
      api_key: tmdbConfig.apiKey,
   },
});

export const axiosInstForClient = axios.create({
   baseURL: 'api',
   params: {
      api_key: tmdbConfig.apiKey,
   },
});
