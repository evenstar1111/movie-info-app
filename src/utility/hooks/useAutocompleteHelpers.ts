import { ContentTypes } from '@/constants';
import { searchCl, SearchTvOrMovieQParams } from '@/interfaces/api';
import { ContentMetaWName } from '@/types/contents/common';
import { switchAll } from '@/utility';
import { SyntheticEvent, useCallback, useState } from 'react';

export type ReturnType = [ContentMetaWName[], (event: SyntheticEvent<Element, Event>, value: string) => void];

export default function useAutocompleteHelpers(type: SearchTvOrMovieQParams['type']): ReturnType {
   const [options, setOptions] = useState<ContentMetaWName[]>([]);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const handleInputChange = useCallback(
      switchAll(async (event: SyntheticEvent<Element, Event>, value: string) => {
         const searchRes = await searchCl({ query: value, type });

         let opsInRes = searchRes.data.results as ContentMetaWName[];

         if (type === ContentTypes.Person) {
            opsInRes = opsInRes.map<ContentMetaWName>((op) => ({
               id: op.id,
               name: op.name,
            }));
         }

         setOptions((prevOptions) => {
            const copied = prevOptions.slice();
            const filtered = opsInRes.filter((op) => !prevOptions.find((pOp) => pOp.id === op.id));
            return copied.concat(filtered);
         });
      }, 500),
      []
   );

   return [options, handleInputChange];
}
