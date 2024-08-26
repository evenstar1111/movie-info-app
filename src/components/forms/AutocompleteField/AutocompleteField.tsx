import { SelectOptionAsObject } from '@/types/common';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ATCValue, Props } from './AutocompleteField.types';

export default function AutocompleteField({
   options,
   defaultValues,
   onValueUpdate,
   handleInputChange,
   label = 'Label',
   placeholder = 'Placeholder',
   multiple = false,
}: Props) {
   const [selectedOptions, setSelectedOptions] = useState<ATCValue>([]);

   useEffect(() => {
      setSelectedOptions(defaultValues);
   }, [defaultValues]);

   return (
      <Autocomplete
         multiple={multiple}
         filterSelectedOptions={multiple}
         size="small"
         value={selectedOptions}
         options={options}
         getOptionLabel={(option: SelectOptionAsObject) => {
            /**
             * FIXME: option value is initially empty arr ([])
             * when, multiple = false
             * */
            if (Array.isArray(option)) return '';
            return option.label;
         }}
         getOptionKey={(option: SelectOptionAsObject) => option.value}
         onChange={(event, value) => {
            setSelectedOptions(value as ATCValue);
            onValueUpdate(value as ATCValue);
         }}
         onInputChange={handleInputChange}
         renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} variant="outlined" />}
      />
   );
}
