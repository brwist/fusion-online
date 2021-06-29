import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { SpendReport } from './SpendReport';
import { OpenRFQs } from './OpenRFQs';
import { OrderDetails } from './OrderDetails';

import './myaccount.scss';

export interface MyAccountNavProps {
  updateTabContent(Component: JSX.Element): void,
  signOut(): void
}

export const MyAccountNav: React.FC<MyAccountNavProps> = ({
  updateTabContent, signOut
}) => {
  const [activeTab, setActiveTab] = useState({
    ordersRfqs: true,
    openOrders: false,
    scheduledOrders: false,
    pastOrders: false,
    openRfqs: false,
    pastRfqs: false,
    spendReport: false,
    payments: false,
    shipping: false,
    manageProfile: false,
    savedParts: false,
  })
  
  const handleClick = (tabName: string, component: JSX.Element) => {
    updateTabContent(component)
    setActiveTab({
      ordersRfqs: false,
      openOrders: false,
      scheduledOrders: false,
      pastOrders: false,
      openRfqs: false,
      pastRfqs: false,
      spendReport: false,
      payments: false,
      shipping: false,
      manageProfile: false,
      savedParts: false,
      [tabName]: true
    })
  }
  return (
    <div className="my-account-nav">
      <Nav as="ul" className="flex-column">
        <Nav.Item as="li">
          <Nav.Link
            onClick={() => handleClick("ordersRfqs", <OrderDetails />)}
            active={activeTab.ordersRfqs}
          >ORDERS &amp; RFQs</Nav.Link>
          <Nav as="ul" className="flex-column">
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => handleClick("openOrders", <></>)}
                active={activeTab.openOrders}
              >OPEN ORDERS</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => handleClick("scheduledOrders", <></>)}
                active={activeTab.scheduledOrders}
              >SCHEDULED ORDERS</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => handleClick("pastOrders", <></>)}
                active={activeTab.pastOrders}
              >PAST ORDERS</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => handleClick("openRfqs", <OpenRFQs />)}
                active={activeTab.openRfqs}
              >OPEN RFQs</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link
                onClick={() => handleClick("pastRfqs", <></>)}
                active={activeTab.pastRfqs}
              >PAST RFQs</Nav.Link>
            </Nav.Item>
          </Nav>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link
            onClick={() => handleClick("spendReport", <SpendReport />)}
            active={activeTab.spendReport}
          >SPEND REPORT</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link 
            onClick={() => handleClick("payments", <></>)}
            active={activeTab.payments}
          >PAYMENTS</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link
            onClick={() => handleClick("shipping", <></>)}
            active={activeTab.shipping}
          >SHIPPING</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link
            onClick={() => handleClick("manageProfile", <></>)}
            active={activeTab.manageProfile}
          >MANAGE PROFILE</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link
            onClick={() => handleClick("savedParts", <></>)}
            active={activeTab.savedParts}
          >SAVED PARTS</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link onClick={() => signOut()}>SIGN OUT</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};
