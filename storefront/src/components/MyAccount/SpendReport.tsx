import React from 'react';
import { Row, Col, Card, Table, Form } from 'react-bootstrap';

import './myaccount.scss';

export interface SpendReportProps {}

export const SpendReport: React.FC<SpendReportProps> = ({
  ...props
}) => {
  return (
    <div className="spend-report">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h1 className="m-0">Spend Report</h1>

        <Form>
          <Form.Group as={Row} controlId="year" className="mb-0">
            <Form.Label column sm={3}>
              Year
            </Form.Label>
            <Col sm={9}>
              <Form.Control as="select" custom defaultValue="2021">
                <option>2021</option>
                <option>2020</option>
                <option>2019</option>
                <option>2018</option>
                <option>2017</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </header>

      <Card>
        <Table borderless striped responsive>
          <thead>
            <tr className="bg-dark text-white">
              <th>Commodity</th>
              <th>CPU</th>
              <th>Finished Goods</th>
              <th>LCD</th>
              <th>Memory</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-weight-bold">DELL COMPUTER (5194)</td>
              <td colSpan="5"><hr className="my-2" /></td>
            </tr>
            <tr>
              <td>JAN</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
            </tr>
            <tr>
              <td>FEB</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
            </tr>
            <tr>
              <td>MAR</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
            </tr>
            <tr>
              <td>APR</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
            </tr>
            <tr>
              <td>MAY</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
            </tr>
            <tr>
              <td>JUN</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
              <td>$221,601.00</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};
