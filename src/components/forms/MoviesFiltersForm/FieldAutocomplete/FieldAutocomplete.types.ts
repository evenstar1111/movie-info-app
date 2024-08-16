import { ContentMetaWName } from '@/types/contents/common';
import { SyntheticEvent } from 'react';

export type Props = {
   options: ContentMetaWName[];
   defaultValues: ContentMetaWName[];
   label?: string;
   placeholder?: string;
   onValueUpdate: (value: ContentMetaWName[]) => void;
   handleInputChange?: (event: SyntheticEvent<Element, Event>, value: string) => void;
};
