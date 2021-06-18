import React from 'react';
import { Nav } from 'react-bootstrap';

import './myaccount.scss';

export interface MyAccountNavProps {}

export const MyAccountNav: React.FC<MyAccountNavProps> = ({
  ...props
}) => {
  return (
    <div className="my-account-nav">
      <Nav as="ul" className="flex-column">
        <Nav.Item as="li">
          <Nav.Link href="#" className="active">ORDERS &amp; RFQs</Nav.Link>
          <Nav as="ul" className="flex-column">
            <Nav.Item as="li">
              <Nav.Link href="#">OPEN ORDERS</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#" className="active">SCHEDULED ORDERS</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#">PAST ORDERS</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#">OPEN RFQs</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#">PAST RFQs</Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">SPEND REPORT</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">PAYMENTS</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">SHIPPING</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">MANAGE PROFILE</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">SAVED PARTS</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="#">SIGN OUT</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};
