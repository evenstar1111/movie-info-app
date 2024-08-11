import { Container } from '@mui/material';

export default function Loading() {
   return (
      <Container
         style={{
            width: '100%',
            top: 0,
            bottom: 0,
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
         }}
         fluid
      >
         <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="sr-only">Loading...</span>
         </div>
      </Container>
   );
}
