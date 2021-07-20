import React from 'react';
import { NavLink, Link, useParams } from 'react-router-dom'
import { Nav } from 'react-bootstrap';

import './myaccount.scss';

export interface MyAccountNavProps {
  signOut(): void;
}

export const MyAccountNav: React.FC<MyAccountNavProps> = ({
  signOut
}) => {
  const {slug} = useParams<{slug: string}>();
  console.log(slug);

  return (
    <div className="my-account-nav">
      <Nav as="ul" className="flex-column">
        <Nav.Item as="li">
          <NavLink
            className="nav-link"
            role="button"
            to="/account/order-details"
          >
            ORDERS &amp; RFQs
          </NavLink>
          <Nav as="ul" className="flex-column">
            <Nav.Item as="li">
              <NavLink
                className="nav-link"
                role="button"
                to="/account/orders/open-orders"
              >
                OPEN ORDERS
              </NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink
                className="nav-link"
                role="button"
                to="/account/orders/scheduled-orders"
              >
                SCHEDULED ORDERS
              </NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink
                className="nav-link"
                role="button"
                to="/account/orders/past-orders"
              >
                PAST ORDERS
              </NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink
                className="nav-link"
                role="button"
                to="/account/orders/open-rfqs"
              >
                OPEN RFQs
              </NavLink>
            </Nav.Item>
            <Nav.Item as="li">
              <NavLink
                className="nav-link"
                role="button"
                to="/account/orders/past-rfqs"
              >
                PAST RFQs
              </NavLink>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item as="li">
          <NavLink
            className="nav-link"
            role="button"
            to="/account/spend-report"
          >
            SPEND REPORT
          </NavLink>
        </Nav.Item>
        <Nav.Item as="li">
          <NavLink
            className="nav-link"
            role="button"
            to="/account/payments"
          >
            PAYMENTS
          </NavLink>
        </Nav.Item>
        <Nav.Item as="li">
          <NavLink
            className="nav-link"
            role="button"
            to="/account/shipping"
          >
            SHIPPING
          </NavLink>
        </Nav.Item>
        <Nav.Item as="li">
          <NavLink
            className="nav-link"
            role="button"
            to="/account/manage-profile"
          >
            MANAGE PROFILE
          </NavLink>
        </Nav.Item>
        <Nav.Item as="li">
          <NavLink
            className="nav-link"
            role="button"
            to="/account/saved-parts"
          >
            SAVED PARTS
          </NavLink>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link onClick={() => signOut()}>SIGN OUT</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};
