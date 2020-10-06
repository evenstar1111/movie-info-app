import { useState } from 'react';
import Link from 'next/link';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
} from 'reactstrap';

const Example = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar id="header_navbar" color="light" light expand="md">
        <Link href="/" passHref>
          <NavLink className="font-weight-bold">Home</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <Link href="/search" passHref>
              <NavLink className="active">Search</NavLink>
            </Link>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;
