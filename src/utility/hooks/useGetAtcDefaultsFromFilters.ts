import { ParamValsSprtrs, type TParamValsSprtr } from '@/constants';
import type { SelectOptionAsObject } from '@/types';
import { useEffect, useRef, useState } from 'react';

type Args<ValueKey extends string = string> = {
   defaults: Partial<Record<ValueKey, string | boolean>>;
   valueKey: ValueKey;
   options: SelectOptionAsObject[];
   valSeparator?: TParamValsSprtr;
};

/**
 * @description Parse content filter value (string) and prepare the default object values for AutocompleteField
 *  components in Content filter form Components.
 */
export default function useGetAtcDefaultsFromFilters<T extends string>({
   defaults,
   valueKey,
   options,
   valSeparator = ParamValsSprtrs.Or,
}: Args<T>) {
   const defaultsApplied = useRef<boolean>(false);
   const [fldDefaultVal, setFldDefaultVal] = useState<SelectOptionAsObject[]>([]);

   useEffect(() => {
      if (defaultsApplied.current || !valueKey || !valSeparator || !defaults || !options.length) {
         return;
      }

      setFldDefaultVal(() => {
         const objIds = (defaults[valueKey] as string)?.split(valSeparator) || [];
         const objVals = objIds.reduce<SelectOptionAsObject[]>((acc, objId) => {
            const found = options.find((obj) => obj.value === objId);
            if (found) acc.push(found);
            return acc;
         }, []);
         return objVals;
      });

      defaultsApplied.current = true;
   }, [options, defaults, valueKey, valSeparator]);

   return fldDefaultVal;
}
