import React from 'react';
import {Switch, Route, NavLink} from 'react-router-dom'
import {Nav } from 'react-bootstrap';
import { OpenRFQs } from './OpenRFQs';
import {OrderDetails} from './OrderDetails';

import './myaccount.scss';

export interface OrdersProps {

}

export const Orders: React.FC<OrdersProps> = ({

}) => {

  return (
    <>
    <Nav as="ul" className="flex-row">
      <Nav.Item as="li">
        <NavLink 
          to="/account/orders/open-orders"
          activeStyle={{color: "#66cc66"}}
          className="nav-link"
        >Open Orders</NavLink>
      </Nav.Item>
      <Nav.Item as="li">
        <NavLink 
          to="/account/orders/open-rfqs"
          activeStyle={{color: "#66cc66"}}
          className="nav-link"
        >Open RFQs</NavLink>
      </Nav.Item>
    </Nav>
    <Switch>
      <Route exact path="/account/orders/open-orders" component={OrderDetails}/>
      <Route exact path="/account/orders/open-rfqs" component={OpenRFQs}/>
    </Switch>
    </>

  );
};
