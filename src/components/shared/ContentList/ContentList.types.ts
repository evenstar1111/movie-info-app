import { TContentTypeVal } from '@/constants';
import { Props as ContentItemProps } from '../ContentItem/ContentItem.types';

export type Props = {
   contents?: Array<ContentItemProps['content']>;
   type?: TContentTypeVal;
};

export type RoutePrefixMap = {
   [key in TContentTypeVal]: string;
};
