import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const image_base = 'https://image.tmdb.org/t/p/w200';
export const image_base_lg = 'https://image.tmdb.org/t/p/w300';
export const imdb_link_tmov = 'https://www.imdb.com/title/';
export const imdb_link_psn = 'https://www.imdb.com/name/';

export const tmdbConfig = {
   apiKey: process.env.TMDB_API_KEY || serverRuntimeConfig.TMDB_API_KEY,
   baseUrl: process.env.TMDB_API_BASE_URL,
   imageBaseUrl: 'https://image.tmdb.org/t/p/w200',
   imageBaseUrlLg: 'https://image.tmdb.org/t/p/w300',
} as const;
