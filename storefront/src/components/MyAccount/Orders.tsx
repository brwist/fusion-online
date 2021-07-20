import React, { Dispatch, SetStateAction } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { OpenRFQs } from './OpenRFQs';

import './myaccount.scss';

export interface OrdersProps {
  navKey: string;
  onChangeTab?: Dispatch<SetStateAction<any>>;
}

export const Orders: React.FC<OrdersProps> = ({
  navKey, onChangeTab
}) => {

  return (
    <Tabs
      activeKey={navKey}
      onSelect={onChangeTab}
      className="mb-3"
    >
      <Tab eventKey="open-orders" title="Open Orders">
        Open Orders
      </Tab>
      <Tab eventKey="open-rfqs" title="Open RFQs">
        <OpenRFQs />
      </Tab>
      <Tab eventKey="past-rfqs" title="Past RFQs">
        Past RFQs
      </Tab>
    </Tabs>
  );
};
