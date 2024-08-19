import { DatePickerProps } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';

export type Props = {
   dateStr?: string;
   label?: string;
   onDateChange: (date: Dayjs | null) => void;
};

export type PickerProps = DatePickerProps<Dayjs>;
