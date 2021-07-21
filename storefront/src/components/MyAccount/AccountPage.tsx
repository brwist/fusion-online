import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { MyAccountNav } from './MyAccountNav';
import { OrderDetails } from './OrderDetails';
import { SpendReport } from './SpendReport';
import { Payments } from './Payments';
import { Shipping } from './Shipping';
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

  return (
    <Container>
      <SectionHeader subheading="My Account" heading={`Hello, ${user.email}`} />
      <Row>
        <Col md={3}>
          <MyAccountNav
            signOut={signOut}
          />
        </Col>
        <Col md={9}>
          <Switch>
            <Route exact path="/account/order-details" component={OrderDetails} />
            <Route exact path="/account/spend-report" component={SpendReport} />
            <Route exact path="/account/payments" component={Payments} />
            <Route exact path="/account/shipping" component={Shipping} />
            <Route exact path="/account/manage-profile" component={ManageProfile} />
            <Route path="/account/orders/:slug" component={Orders} />
          </Switch>
        </Col>
      </Row>
    </Container>
  )
}
