import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

import './myaccount.scss';

export interface PastOrdersProps {}

export const PastOrders: React.FC<PastOrdersProps> = ({
  ...props
}) => {
  return (
    <div className="past-orders">
      <Card>
        <Table borderless striped responsive>
          <thead className="bg-dark text-white">
            <tr>
              <th>RFQ Number <a href="#">123456789</a></th>
              <th>Monday 00, 0000</th>
              <th>$0000.00</th>
              <th className="text-center">
                <a href="#">See Details</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
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
              </td>
              <td colSpan={2}>
                  <div className="font-weight-bold small">Shipping Address</div>
                  Full Name<br />
                  123 Main St.<br />
                  City, State 01234, US
              </td>
              <td className="text-center" style={{'verticalAlign': 'middle'}}>
                <Button variant="primary">
                  Track Package
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>

      <Card>
        <Table borderless striped responsive>
          <thead className="bg-dark text-white">
            <tr>
              <th>RFQ Number <a href="#">123456789</a></th>
              <th>Monday 00, 0000</th>
              <th>$0000.00</th>
              <th className="text-center">
                <a href="#">See Details</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
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
              </td>
              <td colSpan={2}>
                  <div className="font-weight-bold small">Shipping Address</div>
                  Full Name<br />
                  123 Main St.<br />
                  City, State 01234, US
              </td>
              <td className="text-center" style={{'verticalAlign': 'middle'}}>
                <Button variant="primary">
                  Track Package
                </Button>
              </td>
            </tr>
            <tr>
              <td>
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
              </td>
              <td colSpan={2}>
                  <div className="font-weight-bold small">Shipping Address</div>
                  Full Name<br />
                  123 Main St.<br />
                  City, State 01234, US
              </td>
              <td className="text-center" style={{'verticalAlign': 'middle'}}>
                <Button variant="primary">
                  Track Package
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};
