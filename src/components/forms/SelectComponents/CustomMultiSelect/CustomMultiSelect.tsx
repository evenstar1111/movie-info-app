import { Checkbox, Chip, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { Fragment, useMemo } from 'react';
import { CustomSelectMenuProps } from '../defaultPropValues';
import { useStyles } from '../styles';
import { OptionAsObject } from '../types';
import type { Props } from './CustomMultiSelect.types';

export default function CustomMultiSelect({
   label,
   labelId,
   id,
   placeholder,
   value: values,
   size = 'small',
   onChange,
   options,
   enableSelectAll = true,
   renderValue,
   selectedOptionStyle = 'text',
   formControlWidth,
   formControlRootClass = '',
   displayEmpty = false,
   MenuProps = CustomSelectMenuProps,
}: Props) {
   const { classes, cx } = useStyles({ formControlWidth });

   const renderValueDefault: Props['renderValue'] = (selectedValues) => {
      if (selectedValues.length === 0) {
         return <>{placeholder}</>;
      }

      let valuesToRender = selectedValues;

      if (typeof options[0] !== 'string') {
         valuesToRender = selectedValues.map((value) => {
            const foundValueObj = (options as OptionAsObject[]).find((option) => option.value === value);
            return foundValueObj?.label;
         }) as string[];
      }

      return valuesToRender.map((value, index) => (
         <Fragment key={value + index}>
            {selectedOptionStyle === 'text' ? (
               <>
                  {index !== 0 ? ', ' : ''}
                  {value}
               </>
            ) : (
               <Chip label={value} />
            )}
         </Fragment>
      ));
   };

   const allOptionsSelected = useMemo(() => {
      return options.length > 0 && options.length === values.length;
   }, [options, values]);

   const someOptionsSelected = useMemo(() => {
      return values.length > 0 && values.length < options.length;
   }, [options, values]);

   return (
      <FormControl className={cx(classes.formControlRoot, formControlRootClass)}>
         <InputLabel id={labelId}>{label}</InputLabel>
         <Select
            size={size}
            labelId={labelId}
            id={id}
            multiple
            value={values}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            renderValue={renderValue || renderValueDefault}
            MenuProps={MenuProps}
            displayEmpty={displayEmpty}
         >
            {!options.length && (
               <MenuItem disabled>
                  <ListItemText primary="No data available" />
               </MenuItem>
            )}

            {enableSelectAll && !!options.length && (
               <MenuItem value={allOptionsSelected ? 'select-none' : 'select-all'}>
                  <Checkbox checked={allOptionsSelected} indeterminate={someOptionsSelected} />
                  <ListItemText primary={allOptionsSelected ? 'Select None' : 'Select all'} />
               </MenuItem>
            )}

            {options.map((value) => {
               const valueToUse = typeof value === 'string' ? value : value.value;
               const labelToUse = typeof value === 'string' ? value : value.label;

               return (
                  <MenuItem key={valueToUse} value={valueToUse}>
                     <Checkbox checked={values.indexOf(valueToUse) > -1} />
                     <ListItemText primary={labelToUse} />
                  </MenuItem>
               );
            })}
         </Select>
      </FormControl>
   );
}
