import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type Props = PropsWithChildren & {
   filtersCount: number;
   dlgOpen: boolean;
   clearFilters: () => void;
   setDlgOpen: Dispatch<SetStateAction<boolean>>;
};
