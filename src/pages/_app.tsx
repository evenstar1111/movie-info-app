import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import '../styles/globals.scss';
import '../styles/no_gutter.scss';

const roboto = Roboto({
   weight: ['300', '400', '500', '700'],
   subsets: ['latin'],
   display: 'swap',
});

const theme = createTheme({
   typography: {
      fontFamily: roboto.style.fontFamily,
   },
});

export default function App(props: AppProps) {
   const { Component, pageProps } = props;

   return (
      <AppCacheProvider {...props}>
         <ThemeProvider theme={theme}>
            <Component {...pageProps} />
         </ThemeProvider>
      </AppCacheProvider>
   );
}

/* 
TODO: give support for layouts
*/
