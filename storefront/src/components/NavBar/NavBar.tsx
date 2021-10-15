import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav, NavDropdown, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch} from '@fortawesome/pro-regular-svg-icons';
import LogoImg from '../../img/rocketChips.png';
import { Category, Maybe} from '../../generated/graphql';
import { NavBarSearch } from './NavBarSearch';

import './navbar.scss';

import { useQuery } from '@apollo/client';
import { GET_CATEGORY_LIST } from '../../config';

type CategoryListQuery = {
  categories?: Maybe<(
    & { edges: Array<(
      & { node: Maybe<Category>
      })>
    })>
};

export interface NavBarProps {
  signOut(): void,
  cartItemsNum: number
}

export const NavBar: React.FC<NavBarProps> = ({
  signOut, cartItemsNum
}) => {
  const {data} = useQuery<CategoryListQuery>(GET_CATEGORY_LIST, {variables: {first: 6}});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const parentCategories = data?.categories?.edges?.filter(
    ({node}) => !node?.parent
  )

  return (
    <>
      <Modal
        className="search-panel"
        show={show}
        onHide={handleClose}
        >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <NavBarSearch closeSearchModal={handleClose}/>
        </Modal.Body>
      </Modal>

      <header id="header">
        <Navbar variant="light" expand="lg" className="justify-content-between">
          <Container>
            <Navbar.Brand>
              <Link to="/">
                <img
                  src={LogoImg}
                  alt="RocketChips"
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav as="ul" id="main-nav">
                {/* <NavDropdown as="li" title="Mega Menu" className="mega-menu" id="basic-nav-dropdown">
                  <Container>
                    <Row>
                      <Col lg className="d-none d-lg-block">
                        <h4 className="mt-2 font-weight-bold">CPUs</h4>
                      </Col>
                      <Col lg>
                        <NavDropdown.Header>Trending</NavDropdown.Header>
                        <NavDropdown.Item as="div"><Link to="/">Intel® Celeron® Processor N3010</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">Intel® Celeron® Processor N3010</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">Intel® Celeron® Processor N3010</Link></NavDropdown.Item>
                      </Col>
                      <Col lg>
                        <NavDropdown.Header>Manufacturer</NavDropdown.Header>
                        <NavDropdown.Item as="div"><Link to="/">AMD</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">INTEL</Link></NavDropdown.Item>
                      </Col>
                      <Col lg>
                        <NavDropdown.Header>Commodity Group</NavDropdown.Header>
                        <NavDropdown.Item as="div"><Link to="/">Desktop</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">Server</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">Mobile</Link></NavDropdown.Item>
                      </Col>
                      <Col lg>
                        <NavDropdown.Header>Brand</NavDropdown.Header>
                        <NavDropdown.Item as="div"><Link to="/">Xeon</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">Core</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">Celeron</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">Ryzen</Link></NavDropdown.Item>
                        <NavDropdown.Item as="div"><Link to="/">EPYC</Link></NavDropdown.Item>
                      </Col>
                    </Row>
                  </Container>
                </NavDropdown> */}
                {parentCategories?.map(({node}) => {
                  return (
                    <Nav.Item key={node?.id} as="li">
                      <Link className="nav-link" to={`/categories/${node?.slug}`}>{node?.name}</Link>
                    </Nav.Item>
                  )
                })}
                <Nav.Item as="li">
                  <Link className="nav-link" to="/cart">
                    <FontAwesomeIcon icon={faShoppingCart} /> {`(${cartItemsNum})`}
                  </Link>
                </Nav.Item>
              </Nav>

              <Nav as="ul" id="utility-nav">
                <Nav.Item as="li">
                  <a className="nav-link" href="tel:+1 617 502 4100">+1 617 502 4100</a>
                </Nav.Item>
                <Nav.Item as="li">
                  <a className="nav-link" href="mailto:info@fusionww.com">info@fusionww.com</a>
                </Nav.Item>
                <Nav.Item as="li">
                  <Button variant="link" className="nav-link" onClick={handleShow}>
                    Part Search
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="ml-2"
                    />
                  </Button>
                </Nav.Item>
                <NavDropdown as="li" title="My Account" id="account-dropdown">
                  <NavDropdown.Item as="div"><Link to="/account/orders/open-orders">Orders &amp; RFQs</Link></NavDropdown.Item>
                  <NavDropdown.Item as="div"><Link to="/account/spend-report">Spend Report</Link></NavDropdown.Item>
                  <NavDropdown.Item as="div"><Link to="/account/payments">Payments</Link></NavDropdown.Item>
                  <NavDropdown.Item as="div"><Link to="/account/shipping">Shipping</Link></NavDropdown.Item>
                  <NavDropdown.Item as="div"><Link to="/account/manage-profile">Manage Profile</Link></NavDropdown.Item>
                  <NavDropdown.Item as="div"><Link to="/account/saved-parts">Saved Parts</Link></NavDropdown.Item>
                  <NavDropdown.Item as="div" onClick={() => signOut()}>Sign Out</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown as="li" title="My Parts" id="parts-dropdown">
                  <NavDropdown.Item as="div"><Link to="/account/saved-parts">All Lists</Link></NavDropdown.Item>
                  <NavDropdown.Item as="div">List 1</NavDropdown.Item>
                  <NavDropdown.Item as="div">List 2</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};
