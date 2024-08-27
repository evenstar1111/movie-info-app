import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { ComponentProps } from 'react';

const MuiDialog = styled(Dialog)(({ theme }) => {
   return {
      '& .MuiPaper-root': {
         width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
         '.MuiDialogContent-root': {
            paddingLeft: theme.spacing(1.3),
            paddingRight: theme.spacing(1.3),
         },
      },
   };
});

export default MuiDialog;

export type MuiDialogProps = ComponentProps<typeof MuiDialog>;
