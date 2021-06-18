import React from 'react';
import { Card, Table, Button, ProgressBar } from 'react-bootstrap';

import './myaccount.scss';

export interface OpenRFQsProps {}

export const OpenRFQs: React.FC<OpenRFQsProps> = ({
  ...props
}) => {
  return (
    <Card className="open-rfqs">
      <Table borderless responsive>
        <thead>
          <tr>
            <th>RFQ Number <a href="#">123456789</a></th>
            <th>Monday 00, 0000</th>
            <th style={{'width': '300px'}}>
              Progress
              <ProgressBar now={30} className="ml-2" />
            </th>
            <th>
              <a href="#">See Details</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="2">
              <div className="rfq-item">
                <div>
                  <strong>INTEL</strong> 123456789
                </div>
                <div>
                  <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                </div>
                <div className="small mb-2">
                  CIPN: AB1234567
                </div>
                <div className="small">
                  <strong className="text-primary">$9,985</strong><span className="text-muted">/unit</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <strong>Qty: 100</strong>
                </div>
              </div>
              <div className="rfq-item">
                <div>
                  <strong>INTEL</strong> 123456789
                </div>
                <div>
                  <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                </div>
                <div className="small mb-2">
                  CIPN: AB1234567
                </div>
                <div className="small">
                  <strong className="text-primary">$9,985</strong><span className="text-muted">/unit</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <strong>Qty: 100</strong>
                </div>
              </div>
            </td>
            <td>
              <div className="mb-3">
                <div className="font-weight-bold">RFQ Status</div>
                Under Review
              </div>
              <div className="mb-3">
                <div className="font-weight-bold">Shipping Address</div>
                  Full Name<br />
                  123 Main St.<br />
                  City, State 01234, US
              </div>
            </td>
            <td>
              <Button variant="primary" size="sm">
                Cancel
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};
