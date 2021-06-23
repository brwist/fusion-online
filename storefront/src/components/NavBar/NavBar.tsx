import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/pro-regular-svg-icons';
import LogoImg from '../../img/fusion-logo.svg';

import './navbar.scss';

export interface NavBarProps {
  signOut(): void
}

export const NavBar: React.FC<NavBarProps> = ({
  signOut
}) => {
  return (
    <header id="header">
      <Navbar bg="light" variant="light" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={LogoImg}
              alt="Fusion Worldwide"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav as="ul" id="main-nav" className="mr-auto">
              <Nav.Item as="li" className="active">
                <Nav.Link href="#">CPU<span>s</span></Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="#">GPU<span>s</span></Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="#">Memory</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="#">Storage</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="#">
                  <FontAwesomeIcon icon={faShoppingCart} /> (3)
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Nav as="ul" id="utility-nav" className="mr-auto">
              <Nav.Item as="li">
                <Nav.Link href="/search">
                  Part Search
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="ml-2"
                  />
                </Nav.Link>
              </Nav.Item>
              <NavDropdown as="li" title="My Account" id="account-dropdown">
                <NavDropdown.Item href="#">Orders &amp; RFPs</NavDropdown.Item>
                <NavDropdown.Item href="#">Spend Report</NavDropdown.Item>
                <NavDropdown.Item href="#">Payments</NavDropdown.Item>
                <NavDropdown.Item href="#">Shipping</NavDropdown.Item>
                <NavDropdown.Item href="#">Manage Profile</NavDropdown.Item>
                <NavDropdown.Item href="#">Saved Parts</NavDropdown.Item>
                <NavDropdown.Item onClick={() => signOut()} href="#">Sign Out</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown as="li" title="My Parts" id="parts-dropdown">
                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#">Something</NavDropdown.Item>
              </NavDropdown>
              <Nav.Item as="li">
                <Nav.Link
                  href="#"
                  className="px-2 text-muted"
                >
                  DE
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link
                  href="#"
                  className="px-2 text-muted"
                >
                  KO
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
