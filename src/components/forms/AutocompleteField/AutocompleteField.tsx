import { SelectOptionAsObject } from '@/types/common';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Props } from './AutocompleteField.types';

export default function AutocompleteField({
   options,
   defaultValues,
   onValueUpdate,
   handleInputChange,
   label = 'Label',
   placeholder = 'Placeholder',
}: Props) {
   const [selectedOptions, setSelectedOptions] = useState<SelectOptionAsObject[]>([]);

   useEffect(() => {
      setSelectedOptions(defaultValues);
   }, [defaultValues]);

   return (
      <Autocomplete
         multiple
         filterSelectedOptions
         size="small"
         value={selectedOptions}
         options={options}
         getOptionLabel={(option: SelectOptionAsObject) => option.label}
         getOptionKey={(option: SelectOptionAsObject) => option.value}
         onChange={(event, value) => {
            setSelectedOptions(value);
            onValueUpdate(value);
         }}
         onInputChange={handleInputChange}
         renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} variant="outlined" />}
      />
   );
}
