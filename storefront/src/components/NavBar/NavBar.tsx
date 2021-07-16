import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/pro-regular-svg-icons';
import LogoImg from '../../img/fusion-logo.svg';
import { useCategoryList } from '@saleor/sdk'

import './navbar.scss';

export interface NavBarProps {
  signOut(): void,
  cartItemsNum: number
}

export const NavBar: React.FC<NavBarProps> = ({
  signOut, cartItemsNum
}) => {
  const {data} = useCategoryList({first: 10})
  return (
    <header id="header">
      <Navbar variant="light" expand="lg" className="justify-content-between">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={LogoImg}
              alt="Fusion Worldwide"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav as="ul" id="main-nav">
              {data?.map(({id, name}) => {
                return (
                  <Nav.Item key={id} as="li">
                    <Nav.Link href={`/categories/${id}`}>{name}</Nav.Link>
                  </Nav.Item>
                )
              })}
              <Nav.Item as="li">
                <Nav.Link href="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} /> {`(${cartItemsNum})`}
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Nav as="ul" id="utility-nav">
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
                <NavDropdown.Item href="/account/orders-rfps">Orders &amp; RFPs</NavDropdown.Item>
                <NavDropdown.Item href="/account/spend-report">Spend Report</NavDropdown.Item>
                <NavDropdown.Item href="/account/payments">Payments</NavDropdown.Item>
                <NavDropdown.Item href="/account/shipping">Shipping</NavDropdown.Item>
                <NavDropdown.Item href="/account/manage-profile">Manage Profile</NavDropdown.Item>
                <NavDropdown.Item href="/account/saved-parts">Saved Parts</NavDropdown.Item>
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
