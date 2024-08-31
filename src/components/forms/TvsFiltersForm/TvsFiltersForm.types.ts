import { DiscoverTvsQParams } from '@/interfaces/api';
import { AutocompleteFieldProps, DatePickerFldProps } from '..';

export type Props = {
   defaultFilters: DiscoverTvsQParams;
   onFormSubmit: (data: DiscoverTvsQParams) => void;
   kwAtcProps: AtcProps;
};

type AtcProps = Pick<AutocompleteFieldProps, 'handleInputChange' | 'options'>;

export type TvsFormData = DiscoverTvsQParams & {
   first_air_date_gte?: string;
   first_air_date_lte?: string;
   vote_count_gte?: string;
};

export type TFormDataKey = keyof TvsFormData;

export type OnAtcValueChangeFn = (key: TFormDataKey) => AutocompleteFieldProps['onValueUpdate'];

export type DtPickerChangeHandlerFn = (key: TFormDataKey) => DatePickerFldProps['onDateChange'];
