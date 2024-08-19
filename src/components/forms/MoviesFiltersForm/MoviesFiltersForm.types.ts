import { DiscoverMoviesQParams } from '@/interfaces/api';
import { AutocompleteFieldProps, DatePickerFldProps } from '..';

export type Props = {
   defaultFilters: DiscoverMoviesQParams;
   onFormSubmit: (data: DiscoverMoviesQParams) => void;
   kwAtcProps: AtcProps;
   prsnAtcProps: AtcProps;
};

type AtcProps = Pick<AutocompleteFieldProps, 'handleInputChange' | 'options'>;

export type MoviesFormData = DiscoverMoviesQParams & {
   primary_release_date_gte?: string;
   primary_release_date_lte?: string;
};

export type TFormDataKey = keyof MoviesFormData;

export type OnAtcValueChangeFn = (key: TFormDataKey) => AutocompleteFieldProps['onValueUpdate'];

export type DtPickerChangeHandlerFn = (key: TFormDataKey) => DatePickerFldProps['onDateChange'];
