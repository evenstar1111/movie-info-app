import { SelectOptionAsObject } from '@/types';
import { SelectProps } from '@mui/material';
import { Params } from './styles';

export type CustomSelectCommonProps<T> = {
   labelId?: string;
   label?: string;
   id?: string;
   placeholder?: string;
   selectedOptionStyle?: 'text' | 'chip';
   options: string[] | SelectOptionAsObject[];
   value: T;
   formControlRootClass?: string;
   formControlWidth?: Params['formControlWidth'];
   onChange: SelectProps<T>['onChange'];
   renderValue?: SelectProps<T>['renderValue'];
   errorTxt?: string;
} & Pick<SelectProps, 'displayEmpty' | 'MenuProps' | 'disabled' | 'size'>;
