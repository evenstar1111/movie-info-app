import { DatePickerProps } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';

export type Props = {
   date?: Dayjs | null;
   label?: string;
   onDateChange: (date: Dayjs | null) => void;
} & Pick<PickerProps, 'maxDate' | 'minDate' | 'disabled' | 'views' | 'openTo'>;

export type PickerProps = DatePickerProps<Dayjs>;
