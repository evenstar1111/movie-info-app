import { DiscoverMoviesQParams } from '@/interfaces/api';
import { Dispatch, SetStateAction } from 'react';
import { AutocompleteFieldProps } from '..';

export type Props = {
   defaultFilters: DiscoverMoviesQParams;
   updateFilters: Dispatch<SetStateAction<DiscoverMoviesQParams>>;
   kwAtcProps: AtcProps;
   prsnAtcProps: AtcProps;
};

type AtcProps = Pick<AutocompleteFieldProps, 'handleInputChange' | 'options'>;

export type TFormDataKey = keyof DiscoverMoviesQParams;

export type OnAtcValueChangeFn = (key: TFormDataKey) => AutocompleteFieldProps['onValueUpdate'];
