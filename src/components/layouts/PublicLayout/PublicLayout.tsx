import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';
import Header from './Header/Header';

export default function PublicLayout({ children }: PropsWithChildren) {
   return (
      <Container maxWidth={false} disableGutters>
         <Header />
         {children}
      </Container>
   );
}
