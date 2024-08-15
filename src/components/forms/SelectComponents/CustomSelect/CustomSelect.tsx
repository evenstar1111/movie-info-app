import { Chip, FormControl, FormHelperText, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { CustomSelectMenuProps } from '../defaultPropValues';
import { useStyles } from '../styles';
import { OptionAsObject } from '../types';
import type { Props } from './CustomSelect.types';

export default function CustomSelect({
   id,
   placeholder,
   value: values,
   onChange,
   options,
   renderValue,
   label,
   labelId,
   displayEmpty = false,
   selectedOptionStyle = 'text',
   formControlWidth,
   formControlRootClass = '',
   disabled = false,
   errorTxt,
   MenuProps = CustomSelectMenuProps,
}: Props) {
   const { classes, cx } = useStyles({ formControlWidth });

   const renderValueDefault: Props['renderValue'] = (selectedValue) => {
      if (!selectedValue) {
         return <>{placeholder}</>;
      }

      let valueToRender = selectedValue;

      if (options[0] && typeof options[0] !== 'string') {
         const foundValueObj = (options as OptionAsObject[]).find((option) => option.value === selectedValue)!;
         valueToRender = foundValueObj?.label ?? '';
      }

      return <>{selectedOptionStyle === 'text' ? <>{valueToRender}</> : <Chip label={valueToRender} />}</>;
   };

   return (
      <FormControl className={cx(classes.formControlRoot, formControlRootClass)} error={!!errorTxt}>
         <InputLabel id={labelId}>{label}</InputLabel>
         <Select
            labelId={labelId}
            label={label}
            id={id}
            value={values}
            onChange={onChange}
            MenuProps={MenuProps}
            renderValue={renderValue || renderValueDefault}
            displayEmpty={displayEmpty}
            disabled={disabled}
         >
            {!options.length && (
               <MenuItem disabled>
                  <ListItemText primary="No data available" />
               </MenuItem>
            )}

            {options.map((value) => {
               const valueToUse = typeof value === 'string' ? value : value.value;
               const labelToUse = typeof value === 'string' ? value : value.label;
               const isDisabled = typeof value === 'string' ? false : value.isDisabled;

               return (
                  <MenuItem key={valueToUse} value={valueToUse} disabled={isDisabled}>
                     <ListItemText primary={labelToUse} />
                  </MenuItem>
               );
            })}
         </Select>
         {!!errorTxt && <FormHelperText>{errorTxt}</FormHelperText>}
      </FormControl>
   );
}
