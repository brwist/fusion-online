import React from 'react';
import { Switch, Route} from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { MyAccountNav } from './MyAccountNav';
import { SpendReport } from './SpendReport';
import { Payments } from './Payments';
import { Shipping } from './Shipping';
import { ManageProfile } from './ManageProfile';
import { SavedParts } from './SavedParts';
import { Orders } from './Orders';
import { CompleteRegistration } from './CompleteRegistration'

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
            <Route exact path="/account/spend-report" component={SpendReport} />
            <Route exact path="/account/payments" component={Payments} />
            <Route exact path="/account/shipping" component={Shipping} />
            <Route exact path="/account/manage-profile" component={ManageProfile} />
            <Route path="/account/orders" component={Orders} />
            <Route exact path="/account/saved-parts" component={SavedParts} />
            <Route exact path="/account/complete-registration" component={CompleteRegistration}/>
          </Switch>
        </Col>
      </Row>
    </Container>
  )
}
