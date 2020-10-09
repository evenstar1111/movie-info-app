import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export const KEY = process.env.KEY || serverRuntimeConfig.KEY;
export const image_base = 'https://image.tmdb.org/t/p/w200';
export const imdb_link_tmov = 'https://www.imdb.com/title/';
export const imdb_link_psn = 'https://www.imdb.com/name/';
