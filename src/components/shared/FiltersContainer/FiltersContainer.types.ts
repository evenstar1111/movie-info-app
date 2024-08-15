import { PropsWithChildren } from 'react';

export type Props = PropsWithChildren & {
   filtersCount: number;
   clearFilters: () => void;
};
