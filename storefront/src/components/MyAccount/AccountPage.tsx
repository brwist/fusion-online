import React, { useState, Dispatch, SetStateAction } from 'react';
import { Switch, Route} from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import { SectionHeader } from '../SectionHeader/SectionHeader';
import { MyAccountNav } from './MyAccountNav';
import { OrderDetails } from './OrderDetails';
import { SpendReport } from './SpendReport';
import { ManageProfile } from './ManageProfile';
import { Orders } from './Orders';
import './myaccount.scss'

export interface AccountPageProps {
  signOut(): void,
  user: {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
  }
}

export const AccountPage: React.FC<AccountPageProps> = ({
  signOut, user
}) => {
  const [ordersNavKey, setOrdersNavKey] = useState<any>('open-orders');

  return (
    <Container>
      <SectionHeader subheading="My Account" heading={`Hello, ${user.email}`} />
      <Row>
        <Col xs={2}>
          <MyAccountNav
            signOut={signOut}
            ordersNavKey={ordersNavKey}
            onChangeOrdersTab={setOrdersNavKey}
          />
        </Col>
        <Col xs={10}>
          <Switch>
            <Route exact path="/account/order-details" component={OrderDetails} />
            <Route exact path="/account/spend-report" component={SpendReport} />
            <Route exact path="/account/manage-profile" component={ManageProfile} />
            <Route exact path="/account/orders">
              <Orders navKey={ordersNavKey} onChangeTab={setOrdersNavKey} />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Container>
  )
}
