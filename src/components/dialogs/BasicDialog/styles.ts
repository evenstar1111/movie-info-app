import { tss } from 'tss-react';
import BasicDialog from './BasicDialog';

export const useStyles = tss.withName(BasicDialog.name).create({
   root: {
      '& .MuiDialogContent-root': {
         paddingTop: 2,
         paddingBottom: 2,
      },
   },
});
