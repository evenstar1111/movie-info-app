import { SelectOptionAsObject } from '@/types/common';
import { SyntheticEvent } from 'react';

export type Props = {
   options: SelectOptionAsObject[];
   defaultValues: SelectOptionAsObject[];
   label?: string;
   placeholder?: string;
   onValueUpdate: (value: SelectOptionAsObject[]) => void;
   handleInputChange?: (event: SyntheticEvent<Element, Event>, value: string) => void;
};
