import { TContentTypeWPageVal } from '@/constants';
import { Props as ContentItemProps } from '../ContentItem/ContentItem.types';

export type Props = {
   contents?: Array<ContentItemProps['content']>;
   type?: TContentTypeWPageVal;
};

export type RoutePrefixMap = {
   [key in TContentTypeWPageVal]: string;
};
