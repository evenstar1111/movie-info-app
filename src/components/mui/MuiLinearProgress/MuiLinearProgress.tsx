import { LinearProgress, linearProgressClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CustomProps } from './MuiLinearProgress.types';

const MuiLinearProgress = styled(LinearProgress, {
   shouldForwardProp: (prop) => prop !== 'centered',
})<CustomProps>(({ theme, centered }) => ({
   height: 5,
   borderRadius: 1,

   ...(centered && {
      margin: 'auto',
      width: '50%',
   }),

   [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
   },
   [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.grey[400],
   },
}));

export default MuiLinearProgress;
