import { DiscoverMoviesQParams, TMoviesSortByOptionKey, TMoviesSortByOptionValue } from '@/interfaces/api';
import { Dispatch, SetStateAction } from 'react';
import { Props as FieldAutocompleteProps } from './FieldAutocomplete/FieldAutocomplete.types';

export type Props = {
   defaultFilters: DiscoverMoviesQParams;
   updateFilters: Dispatch<SetStateAction<DiscoverMoviesQParams>>;
   kwAtcProps: AtcProps;
   prsnAtcProps: AtcProps;
};

type AtcProps = Pick<FieldAutocompleteProps, 'handleInputChange' | 'options'>;

export type ContentTypeOption = {
   label: TMoviesSortByOptionKey;
   value: TMoviesSortByOptionValue;
};
