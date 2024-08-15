import { ContentMetaWName } from '@/types/contents/common';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Props } from './FieldAutocomplete.types';

export default function FieldAutocomplete({
   options,
   defaultValues,
   onValueUpdate,
   handleInputChange,
   label = 'Label',
   placeholder = 'Placeholder',
}: Props) {
   const [selectedOptions, setSelectedOptions] = useState<ContentMetaWName[]>([]);

   useEffect(() => {
      setSelectedOptions(defaultValues);
   }, [defaultValues]);

   return (
      <Autocomplete
         multiple
         filterSelectedOptions
         value={selectedOptions}
         options={options}
         getOptionLabel={(option: ContentMetaWName) => option.name}
         getOptionKey={(option: ContentMetaWName) => option.id}
         onChange={(event, value) => {
            setSelectedOptions(value);
            onValueUpdate(value);
         }}
         onInputChange={handleInputChange}
         renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} variant="outlined" />}
      />
   );
}
