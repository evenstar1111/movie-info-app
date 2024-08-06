import theme from '@/theme/theme';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import '../styles/globals.scss';
import '../styles/no_gutter.scss';

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
