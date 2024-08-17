import { searchCl, SearchTvOrMovieQParams } from '@/interfaces/api';
import { SelectOptionAsObject } from '@/types';
import { ContentMetaWName } from '@/types/contents/common';
import { switchAll } from '@/utility';
import { SyntheticEvent, useCallback, useState } from 'react';

export type ReturnType = [SelectOptionAsObject[], (event: SyntheticEvent<Element, Event>, value: string) => void];

export default function useAutocompleteHelpers(type: SearchTvOrMovieQParams['type']): ReturnType {
   const [options, setOptions] = useState<SelectOptionAsObject[]>([]);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   const handleInputChange = useCallback(
      switchAll(async (event: SyntheticEvent<Element, Event>, value: string) => {
         const searchRes = await searchCl({ query: value, type });

         const opsInRes = searchRes.data.results as ContentMetaWName[];

         const opsInResTransformed = opsInRes.map<SelectOptionAsObject>((op) => ({
            value: op.id.toString(),
            label: op.name,
         }));

         setOptions((prevOptions) => {
            const copied = prevOptions.slice();
            const filtered = opsInResTransformed.filter((op) => !prevOptions.find((pOp) => pOp.value === op.value));
            return copied.concat(filtered);
         });
      }, 500),
      []
   );

   return [options, handleInputChange];
}
