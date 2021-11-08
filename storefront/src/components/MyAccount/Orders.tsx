import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap';

import { OpenOrders } from './OpenOrders';
import { OrderDetails } from './OrderDetails';
import { ScheduledOrders } from './ScheduledOrders';
import { PastOrders } from './PastOrders';
import { OpenRFQs } from './OpenRFQs';
import { PastRFQs } from './PastRFQs';
import {useOrdersByUserQuery} from '../../graphql/account'

import './myaccount.scss';

export interface OrdersProps {

}

export const Orders: React.FC<OrdersProps> = (props) => {
  const {data} = useOrdersByUserQuery( {variables: {perPage: 10}});
  const openOrders = data?.me?.orders?.edges?.filter((order) => order?.node.statusDisplay === "Unfulfilled")
  const pastOrders = data?.me?.orders?.edges?.filter((order) => order?.node.statusDisplay === "Fulfilled")
  
  console.log("ordersCustom", data)
  return (
    <>
    <Nav as="ul" className="nav-tabs mb-3">
      <Nav.Item as="li">
        <NavLink
          to="/account/orders/open-orders"
          className="nav-link"
          role="tab"
        >
          {`Open Orders (${openOrders?.length || 0})`}
        </NavLink>
      </Nav.Item>
      {/* <Nav.Item as="li">
        <NavLink
          to="/account/orders/scheduled-orders"
          className="nav-link"
          role="tab"
        >
          Scheduled Orders (3)
        </NavLink>
      </Nav.Item> */}
      <Nav.Item as="li">
        <NavLink
          to="/account/orders/past-orders"
          className="nav-link"
          role="tab"
        >
          {`Past Orders (${pastOrders?.length || 0})`}
        </NavLink>
      </Nav.Item>
      <Nav.Item as="li">
        <NavLink
          to="/account/orders/open-rfqs"
          className="nav-link"
          role="tab"
        >
          Open RFQs
        </NavLink>
      </Nav.Item>
      <Nav.Item as="li">
        <NavLink
          to="/account/orders/past-rfqs"
          className="nav-link"
          role="tab"
        >
          Past RFQs
        </NavLink>
      </Nav.Item>
    </Nav>
    <Switch>
      <Route exact path="/account/orders/open-orders">
        <OpenOrders orders={data?.me?.orders?.edges || []}/>
      </Route>
      <Route exact path="/account/orders/open-orders/:id" component={OrderDetails} />
      <Route exact path="/account/orders/scheduled-orders" component={ScheduledOrders} />
      <Route exact path="/account/orders/scheduled-orders/:id" component={OrderDetails} />
      <Route exact path="/account/orders/past-orders" component={PastOrders} />
      <Route exact path="/account/orders/past-orders/:id" component={OrderDetails} />
      <Route exact path="/account/orders/open-rfqs" component={OpenRFQs} />
      <Route exact path="/account/orders/past-rfqs" component={PastRFQs} />
      <Route exact path="/account/orders">
        <OpenOrders orders={data?.me?.orders?.edges || []}/>
      </Route>
    </Switch>
    </>

  );
};
