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
   Abenteuer: {
      id: 12,
      name: 'Abenteuer',
   },
   Animation: {
      id: 16,
      name: 'Animation',
   },
   Komödie: {
      id: 35,
      name: 'Komödie',
   },
   Krimi: {
      id: 80,
      name: 'Krimi',
   },
   Dokumentarfilm: {
      id: 99,
      name: 'Dokumentarfilm',
   },
   Drama: {
      id: 18,
      name: 'Drama',
   },
   Familie: {
      id: 10751,
      name: 'Familie',
   },
   Fantasy: {
      id: 14,
      name: 'Fantasy',
   },
   Historie: {
      id: 36,
      name: 'Historie',
   },
   Horror: {
      id: 27,
      name: 'Horror',
   },
   Musik: {
      id: 10402,
      name: 'Musik',
   },
   Mystery: {
      id: 9648,
      name: 'Mystery',
   },
   Liebesfilm: {
      id: 10749,
      name: 'Liebesfilm',
   },
   'Science Fiction': {
      id: 878,
      name: 'Science Fiction',
   },
   'TV-Film': {
      id: 10770,
      name: 'TV-Film',
   },
   Thriller: {
      id: 53,
      name: 'Thriller',
   },
   Kriegsfilm: {
      id: 10752,
      name: 'Kriegsfilm',
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
   Komödie: {
      id: 35,
      name: 'Komödie',
   },
   Krimi: {
      id: 80,
      name: 'Krimi',
   },
   Dokumentarfilm: {
      id: 99,
      name: 'Dokumentarfilm',
   },
   Drama: {
      id: 18,
      name: 'Drama',
   },
   Familie: {
      id: 10751,
      name: 'Familie',
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
