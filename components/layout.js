import { Container } from 'reactstrap';
import Header from './header';

export default function Layout({ children }) {
  return (
    <div className="p-0">
      <Header />
      {children}
    </div>
  );
}
