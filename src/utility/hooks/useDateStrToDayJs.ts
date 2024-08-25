import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';

export default function useDateStrToDayJs(dateStr?: string) {
   const dayJsObj = useMemo<Dayjs | null>(() => {
      if (!dateStr) return null;
      return dayjs(dateStr);
   }, [dateStr]);

   return dayJsObj;
}
