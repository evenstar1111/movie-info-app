import { SelectOptionAsObject } from '@/types/common';
import { SyntheticEvent } from 'react';

export type Props = {
   _key?: string /* Used for debugging pupose only */;
   options: SelectOptionAsObject[];
   defaultValues: ATCValue;
   label?: string;
   placeholder?: string;
   multiple?: boolean;
   onValueUpdate: (value: ATCValue) => void;
   handleInputChange?: (event: SyntheticEvent<Element, Event>, value: string) => void;
};

export type ATCValue = SelectOptionAsObject | SelectOptionAsObject[];
