import { MuiDatePicker } from '@/components/mui';
import { PickerProps, Props } from './DatePickerFld.types';

export default function DatePickerFld({
   date,
   maxDate,
   minDate,
   onDateChange,
   label = 'Picker label',
   disabled = false,
   views = ['year', 'month', 'day'],
   openTo = 'year',
}: Props) {
   const handleDateChange: PickerProps['onChange'] = (dateObj) => {
      onDateChange(dateObj);
   };

   return (
      <MuiDatePicker
         value={date}
         onChange={handleDateChange}
         label={label}
         views={views}
         openTo={openTo}
         maxDate={maxDate}
         minDate={minDate}
         disabled={disabled}
      />
   );
}
