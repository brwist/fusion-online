import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/pro-regular-svg-icons';
import LogoImg from '../../img/rocketChips.png';
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
          <Navbar.Brand>
            <Link to="/">
            <img
              src={LogoImg}
              alt="Fusion Worldwide"
            />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav as="ul" id="main-nav">
              {data?.map(({id, name}) => {
                return (
                  <Nav.Item key={id} as="li">
                    <Nav.Link>
                      <Link to={`/categories/${id}`}>{name}</Link>
                      </Nav.Link>
                  </Nav.Item>
                )
              })}
              <Nav.Item as="li">
                <Nav.Link>
                  <Link to="/cart">
                  <FontAwesomeIcon icon={faShoppingCart} /> {`(${cartItemsNum})`}
                  </Link>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Nav as="ul" id="utility-nav">
              <Nav.Item as="li">
                <Nav.Link>
                  <Link to="/search">
                  Part Search
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="ml-2"
                  />
                  </Link>
                </Nav.Link>
              </Nav.Item>
              <NavDropdown as="li" title="My Account" id="account-dropdown">
                <NavDropdown.Item><Link to="/account/orders/open-orders">Orders &amp; RFPs</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/account/spend-report">Spend Report</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/account/payments">Payments</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/account/shipping">Shipping</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/account/manage-profile">Manage Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/account/saved-parts">Saved Parts</Link></NavDropdown.Item>
                <NavDropdown.Item onClick={() => signOut()}>Sign Out</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown as="li" title="My Parts" id="parts-dropdown">
                <NavDropdown.Item><Link to="/account/saved-parts">All Lists</Link></NavDropdown.Item>
                <NavDropdown.Item href="#">List 1</NavDropdown.Item>
                <NavDropdown.Item href="#">List 2</NavDropdown.Item>
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
