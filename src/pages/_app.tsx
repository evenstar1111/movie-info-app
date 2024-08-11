import theme from '@/theme/theme';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import { AppProps } from 'next/app';

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
