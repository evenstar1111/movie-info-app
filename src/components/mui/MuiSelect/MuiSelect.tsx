import { Select } from '@mui/material';
import { styled } from '@mui/material/styles';

const MuiSelect = styled(Select)(({ theme }) => {
   return {
      width: '100%',
      '& .MuiSelect-root': {
         width: '100%',
      },
   };
});

export default MuiSelect;
