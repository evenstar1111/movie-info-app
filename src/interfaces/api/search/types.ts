import { CommonSearchQParams } from '../shared.types';

export type SearchTvOrMovieQParams = CommonSearchQParams & {
   type: SearchContentType;
   year?: number;
};

export enum SearchContentType {
   Movie = 'movie',
   Tv = 'tv',
   Person = 'person',
   Collection = 'collection',
}
