import React from 'react';
import {NavLink, useParams } from 'react-router-dom'
import { Nav } from 'react-bootstrap';

import './myaccount.scss';

export interface MyAccountNavProps {
  signOut(): void
}

export const MyAccountNav: React.FC<MyAccountNavProps> = ({
  signOut
}) => {

  const {slug} = useParams<{slug: string}>()
  console.log(slug)
  return (
    <div className="my-account-nav">
      <Nav as="ul" className="flex-column">
        <Nav.Item as="li">
          <Nav.Link><NavLink 
            to="/account/orders-rfps"
            activeStyle={{color: "#66cc66"}}
          >
            ORDERS &amp; RFQs </NavLink></Nav.Link>
          <Nav as="ul" className="flex-column">
            <Nav.Item as="li">
              <Nav.Link>
              <NavLink 
                to="/account/open-orders"
                activeStyle={{color: "#66cc66"}}
              >
                OPEN ORDERS</NavLink></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link>
              <NavLink 
                to="/account/scheduled-orders"
                activeStyle={{color: "#66cc66"}}
              >
                SCHEDULED ORDERS</NavLink></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link>
              <NavLink 
                to="/account/past-orders"
                activeStyle={{color: "#66cc66"}}
              >
                PAST ORDERS</NavLink></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link>
              <NavLink 
                to="/account/open-rfqs"
                activeStyle={{color: "#66cc66"}}
              >
                OPEN RFQs</NavLink></Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link>
              <NavLink 
                to="/account/past-rfqs"
                activeStyle={{color: "#66cc66"}}
              >
                PAST RFQs</NavLink></Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
          <NavLink 
            to="/account/spend-report"
            activeStyle={{color: "#66cc66"}}
          >SPEND REPORT</NavLink></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
          <NavLink 
            to="/account/payments"
            activeStyle={{color: "#66cc66"}}
          >PAYMENTS</NavLink></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
          <NavLink 
            to="/account/shipping"
            activeStyle={{color: "#66cc66"}}
          >SHIPPING</NavLink></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
          <NavLink 
            to="/account/manage-profile"
            activeStyle={{color: "#66cc66"}}
          >MANAGE PROFILE</NavLink></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link>
          <NavLink 
            to="/account/saved-parts"
            activeStyle={{color: "#66cc66"}}
          >SAVED PARTS</NavLink></Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link onClick={() => signOut()}>SIGN OUT</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};
