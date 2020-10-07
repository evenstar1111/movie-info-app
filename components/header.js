import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  NavbarBrand,
  NavItem,
} from 'reactstrap';

export default function Header() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar id="header_navbar" color="light" light expand="md">
        <NavbarBrand
          style={{ marginLeft: 16 }}
          onClick={() => router.replace('/')}
        >
          <h1>Home</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {pages.map((page) => (
              <NavItem key={page.name}>
                <Link href={page.path} passHref>
                  <NavLink
                    className={
                      page.path === router.pathname ? 'active' : ''
                    }
                  >
                    {page.name}
                  </NavLink>
                </Link>
              </NavItem>
            ))}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const pages = [
  { name: 'Movies', path: '/movies' },
  { name: 'Tvs', path: '/tvs' },
  { name: 'Search', path: '/search' },
];
