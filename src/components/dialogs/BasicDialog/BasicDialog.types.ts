import { PropsWithChildren, ReactElement } from 'react';

export type Props = PropsWithChildren & {
   open: boolean;
   title?: string;
   actions?: ReactElement;
   onClose: () => void;
};
