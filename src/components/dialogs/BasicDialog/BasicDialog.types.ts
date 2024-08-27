import { MuiDialogProps } from '@/components/mui/MuiDialog/MuiDialog';
import { PropsWithChildren, ReactElement } from 'react';

export type Props = PropsWithChildren & {
   open: boolean;
   title?: string;
   actions?: ReactElement;
   onClose: () => void;
   /**
    * @note All props passed to MuiDialog can be overriden with `dialogProps`,
    * except the `open` or `onClose`. For clarifications check it's definition.
    */
   dialogProps?: Omit<MuiDialogProps, 'open' | 'title'>;
};
