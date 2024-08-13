import { ContentTypes, TContentTypeKey } from '@/constants';
import { ContentTypeOption } from './SearchFiltersForm.types';

/**
 *
 * TODO: make it global, as it needed in many places
 * define helper function to transform object into options array
 */
export const contentTypeOptions: ContentTypeOption[] = Object.keys(ContentTypes).map((item) => {
   const itemTyped = item as TContentTypeKey;

   return {
      label: itemTyped,
      value: ContentTypes[itemTyped],
   };
});
