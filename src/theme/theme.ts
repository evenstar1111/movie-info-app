import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
   weight: ['300', '400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
});

let theme = createTheme({
   typography: {
      fontFamily: roboto.style.fontFamily,
   },
   components: {
      MuiButton: {
         defaultProps: {
            variant: 'outlined',
            color: 'info',
         },
      },
   },
});

theme = responsiveFontSizes(theme);

export default theme;
