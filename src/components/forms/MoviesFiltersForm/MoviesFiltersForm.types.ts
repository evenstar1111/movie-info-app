import { DiscoverMoviesQParams, TMoviesSortByOptionKey, TMoviesSortByOptionValue } from '@/interfaces/api';
import { Dispatch, SetStateAction } from 'react';
import { AutocompleteFieldProps } from '..';

export type Props = {
   defaultFilters: DiscoverMoviesQParams;
   updateFilters: Dispatch<SetStateAction<DiscoverMoviesQParams>>;
   kwAtcProps: AtcProps;
   prsnAtcProps: AtcProps;
};

type AtcProps = Pick<AutocompleteFieldProps, 'handleInputChange' | 'options'>;

export type ContentTypeOption = {
   label: TMoviesSortByOptionKey;
   value: TMoviesSortByOptionValue;
};
