/* FIXME: ContentTypes */
export const ContentTypes = {
   Movie: 'movie',
   Tv: 'tv',
   Person: 'person',
   Collection: 'collection',
   Keyword: 'keyword',
} as const;
export type TContentTypeKey = keyof typeof ContentTypes;
export type TContentTypeWPageKey = Extract<TContentTypeKey, 'Movie' | 'Tv' | 'Person' | 'Collection'>;
export type TContentTypeVal = (typeof ContentTypes)[keyof typeof ContentTypes];
export type TContentTypeWPageVal = Extract<TContentTypeVal, 'movie' | 'tv' | 'person' | 'collection'>;

export const MoviesGenres = {
   Action: {
      id: 28,
      name: 'Action',
   },
   Adventure: {
      id: 12,
      name: 'Adventure',
   },
   Animation: {
      id: 16,
      name: 'Animation',
   },
   Comedy: {
      id: 35,
      name: 'Comedy',
   },
   Crime: {
      id: 80,
      name: 'Crime',
   },
   Documentary: {
      id: 99,
      name: 'Documentary',
   },
   Drama: {
      id: 18,
      name: 'Drama',
   },
   Family: {
      id: 10751,
      name: 'Family',
   },
   Fantasy: {
      id: 14,
      name: 'Fantasy',
   },
   History: {
      id: 36,
      name: 'History',
   },
   Horror: {
      id: 27,
      name: 'Horror',
   },
   Music: {
      id: 10402,
      name: 'Music',
   },
   Mystery: {
      id: 9648,
      name: 'Mystery',
   },
   Romance: {
      id: 10749,
      name: 'Romance',
   },
   'Science Fiction': {
      id: 878,
      name: 'Science Fiction',
   },
   'TV Movie': {
      id: 10770,
      name: 'TV Movie',
   },
   Thriller: {
      id: 53,
      name: 'Thriller',
   },
   War: {
      id: 10752,
      name: 'War',
   },
   Western: {
      id: 37,
      name: 'Western',
   },
} as const;
export type TMoviesGenreKey = keyof typeof MoviesGenres;

export const TvsGenres = {
   'Action & Adventure': {
      id: 10759,
      name: 'Action & Adventure',
   },
   Animation: {
      id: 16,
      name: 'Animation',
   },
   Comedy: {
      id: 35,
      name: 'Comedy',
   },
   Crime: {
      id: 80,
      name: 'Crime',
   },
   Documentary: {
      id: 99,
      name: 'Documentary',
   },
   Drama: {
      id: 18,
      name: 'Drama',
   },
   Family: {
      id: 10751,
      name: 'Family',
   },
   Kids: {
      id: 10762,
      name: 'Kids',
   },
   Mystery: {
      id: 9648,
      name: 'Mystery',
   },
   News: {
      id: 10763,
      name: 'News',
   },
   Reality: {
      id: 10764,
      name: 'Reality',
   },
   'Sci-Fi & Fantasy': {
      id: 10765,
      name: 'Sci-Fi & Fantasy',
   },
   Soap: {
      id: 10766,
      name: 'Soap',
   },
   Talk: {
      id: 10767,
      name: 'Talk',
   },
   'War & Politics': {
      id: 10768,
      name: 'War & Politics',
   },
   Western: {
      id: 37,
      name: 'Western',
   },
} as const;

export const ParamValsSprtrs = {
   Or: '|',
   And: ',',
} as const;
export type TParamValsSprtr = (typeof ParamValsSprtrs)[keyof typeof ParamValsSprtrs];

export const TMDBDateFormat = 'YYYY-MM-DD'; //TODO: consider moving it to sep. folder.
