import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Table } from 'react-bootstrap';

import './myaccount.scss';

export interface ScheduledOrdersProps {}

export const ScheduledOrders: React.FC<ScheduledOrdersProps> = ({
  ...props
}) => {
  return (
    <div className="scheduled-orders">
      <Card>
        <Table borderless responsive>
          <thead className="bg-dark text-white">
            <tr>
              <th>RFQ Number <Link to="/">123456789</Link></th>
              <th colSpan={2}>Monday 00, 0000</th>
              <th>$0000.00</th>
              <th className="text-center">
                <Link to="/account/orders/scheduled-orders/2">See Details</Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Shipment 1
              </td>
              <td>
                <small>PRODUCTS: <strong>2</strong></small>
              </td>
              <td>
                <small>UNITS: <strong>150</strong></small>
              </td>
              <td>
                <small>DELIVERY BY: <strong>Feb 01, 2022</strong></small>
              </td>
              <td>
                <small>DELIVERY TO: <strong>123 Main St, Haverhill, MA 01835, USA</strong></small>
              </td>
            </tr>
            <tr>
              <td>
                Shipment 1
              </td>
              <td>
                <small>PRODUCTS: <strong>2</strong></small>
              </td>
              <td>
                <small>UNITS: <strong>150</strong></small>
              </td>
              <td>
                <small>DELIVERY BY: <strong>Feb 01, 2022</strong></small>
              </td>
              <td>
                <small>DELIVERY TO: <strong>123 Main St, Haverhill, MA 01835, USA</strong></small>
              </td>
            </tr>
            <tr>
              <td>
                Shipment 1
              </td>
              <td>
                <small>PRODUCTS: <strong>2</strong></small>
              </td>
              <td>
                <small>UNITS: <strong>150</strong></small>
              </td>
              <td>
                <small>DELIVERY BY: <strong>Feb 01, 2022</strong></small>
              </td>
              <td>
                <small>DELIVERY TO: <strong>123 Main St, Haverhill, MA 01835, USA</strong></small>
              </td>
            </tr>
            <tr>
              <td>
                Shipment 1
              </td>
              <td>
                <small>PRODUCTS: <strong>2</strong></small>
              </td>
              <td>
                <small>UNITS: <strong>150</strong></small>
              </td>
              <td>
                <small>DELIVERY BY: <strong>Feb 01, 2022</strong></small>
              </td>
              <td>
                <small>DELIVERY TO: <strong>123 Main St, Haverhill, MA 01835, USA</strong></small>
              </td>
            </tr>
            <tr>
              <td>
                Shipment 1
              </td>
              <td>
                <small>PRODUCTS: <strong>2</strong></small>
              </td>
              <td>
                <small>UNITS: <strong>150</strong></small>
              </td>
              <td>
                <small>DELIVERY BY: <strong>Feb 01, 2022</strong></small>
              </td>
              <td>
                <small>DELIVERY TO: <strong>123 Main St, Haverhill, MA 01835, USA</strong></small>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>

      <Card>
      <Table borderless responsive>
          <thead className="bg-dark text-white">
            <tr>
              <th>RFQ Number <Link to="/">123456789</Link></th>
              <th colSpan={2}>Monday 00, 0000</th>
              <th>$0000.00</th>
              <th className="text-center">
                <Link to="/account/orders/scheduled-orders/3">See Details</Link>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Shipment 1
              </td>
              <td>
                <small>PRODUCTS: <strong>2</strong></small>
              </td>
              <td>
                <small>UNITS: <strong>150</strong></small>
              </td>
              <td>
                <small>DELIVERY BY: <strong>Feb 01, 2022</strong></small>
              </td>
              <td>
                <small>DELIVERY TO: <strong>123 Main St, Haverhill, MA 01835, USA</strong></small>
              </td>
            </tr>
            <tr>
              <td>
                Shipment 1
              </td>
              <td>
                <small>PRODUCTS: <strong>2</strong></small>
              </td>
              <td>
                <small>UNITS: <strong>150</strong></small>
              </td>
              <td>
                <small>DELIVERY BY: <strong>Feb 01, 2022</strong></small>
              </td>
              <td>
                <small>DELIVERY TO: <strong>123 Main St, Haverhill, MA 01835, USA</strong></small>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};
