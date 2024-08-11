import { DiscoverMoviesQParams, TMoviesSortByOptionKey, TMoviesSortByOptionValue } from '@/interfaces/api';
import { Dispatch, SetStateAction } from 'react';

export type Props = {
   updateFilters: Dispatch<SetStateAction<DiscoverMoviesQParams>>;
};

export type ContentTypeOption = {
   label: TMoviesSortByOptionKey;
   value: TMoviesSortByOptionValue;
};
