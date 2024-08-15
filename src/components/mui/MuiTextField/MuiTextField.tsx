import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const MuiTextField = styled(TextField)(({ theme }) => {
   return {
      width: '100%',
   };
});

export default MuiTextField;
