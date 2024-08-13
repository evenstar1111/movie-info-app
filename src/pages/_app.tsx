import theme from '@/theme/theme';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import '../styles.css';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
   getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout) {
   const { Component, pageProps } = props;
   const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

   return (
      <AppCacheProvider {...props}>
         <ThemeProvider theme={theme}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
      </AppCacheProvider>
   );
}
