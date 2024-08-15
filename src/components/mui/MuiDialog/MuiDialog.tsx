import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

const MuiDialog = styled(Dialog)(({ theme }) => {
   return {
      '& .MuiPaper-root': {
         width: '100%',
      },
   };
});

export default MuiDialog;
