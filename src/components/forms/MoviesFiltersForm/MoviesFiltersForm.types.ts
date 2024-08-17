import { DiscoverMoviesQParams } from '@/interfaces/api';
import { AutocompleteFieldProps } from '..';

export type Props = {
   defaultFilters: DiscoverMoviesQParams;
   onFormSubmit: (data: DiscoverMoviesQParams) => void;
   kwAtcProps: AtcProps;
   prsnAtcProps: AtcProps;
};

type AtcProps = Pick<AutocompleteFieldProps, 'handleInputChange' | 'options'>;

export type TFormDataKey = keyof DiscoverMoviesQParams;

export type OnAtcValueChangeFn = (key: TFormDataKey) => AutocompleteFieldProps['onValueUpdate'];
