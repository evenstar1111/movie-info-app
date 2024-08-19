import { MuiDatePicker } from '@/components/mui';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { PickerProps, Props } from './DatePickerFld.types';

export default function DatePickerFld({ dateStr, label = 'Picker label', onDateChange }: Props) {
   const value = useMemo<Dayjs | null>(() => {
      if (!dateStr) return null;
      return dayjs(dateStr);
   }, [dateStr]);

   const handleDateChange: PickerProps['onChange'] = (dateObj) => {
      onDateChange(dateObj);
   };

   return <MuiDatePicker value={value} onChange={handleDateChange} label={label} />;
}
