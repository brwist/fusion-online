import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/pro-regular-svg-icons';

import './myaccount.scss';

export interface SavedPartsProps {}

export const SavedParts: React.FC<SavedPartsProps> = ({
  ...props
}) => {
  return (
    <div className="saved-parts">
      <header className="my-3 d-flex justify-content-between align-items-center">
        <div>
          <Link to="/" className="small">SEE ALL PARTS LISTS</Link>
          <h2 className="h3 mt-1 mb-0">Parts List Title Here</h2>
        </div>
        <Button variant="primary">
          Order List
        </Button>
      </header>

      <Card className="flex-row justify-content-between align-items-center">
        <div>
          <Button variant="link">
            <FontAwesomeIcon icon={faTimes} size="lg" className="mr-1 text-danger" /> Remove List
          </Button>
          <Button variant="link">
            <FontAwesomeIcon icon={faUpload} size="lg" className="mr-1 text-primary" /> Bill of Materials
          </Button>
        </div>
        <div className="font-weight-bold small mr-4">
          Total: <span className="pl-2">$0000.00</span>
        </div>
      </Card>

      <Card>
        <Table borderless striped responsive>
          <tbody>
            <tr>
              <td style={{'width': '300px'}}>
                <div className="small">
                  <strong className="text-uppercase">INTEL</strong> 123456789
                </div>
                <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                <div className="small mt-1">
                  Spec Code: 12345 | Ordering Code: 12345
                </div>
              </td>
              <td className="text-center">
                <div className="font-weight-bold small mb-2">Per Unit Price</div>
                <strong className="text-primary">$9,985</strong><span className="text-muted">/unit</span>
              </td>
              <td className="text-center" style={{'width': '90px'}}>
                <div className="font-weight-bold small mb-1">Qty</div>
                <Form.Group controlId="qty-1" className="m-0">
                  <Form.Label className="sr-only">Qty</Form.Label>
                  <Form.Control
                    size="sm"
                    type="number"
                    min={1}
                    max={50}
                    name="quantity"
                  />
                </Form.Group>
              </td>
              <td className="text-right font-weight-bold">
                <div className="font-weight-bold small mb-2">Product Total</div>
                $0000.00
              </td>
              <td className="text-right">
                <Button variant="link">
                  <FontAwesomeIcon icon={faTimes} size="lg" className="text-danger" />
                </Button>
              </td>
            </tr>
            <tr>
              <td style={{'width': '300px'}}>
                <div className="small">
                  <strong className="text-uppercase">INTEL</strong> 123456789
                </div>
                <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                <div className="small mt-1">
                  Spec Code: 12345 | Ordering Code: 12345
                </div>
              </td>
              <td className="text-center">
                <div className="font-weight-bold small mb-2">Per Unit Price</div>
                <strong className="text-primary">$9,985</strong><span className="text-muted">/unit</span>
              </td>
              <td className="text-center" style={{'width': '90px'}}>
                <div className="font-weight-bold small mb-1">Qty</div>
                <Form.Group controlId="qty-1" className="m-0">
                  <Form.Label className="sr-only">Qty</Form.Label>
                  <Form.Control
                    size="sm"
                    type="number"
                    min={1}
                    max={50}
                    name="quantity"
                  />
                </Form.Group>
              </td>
              <td className="text-right font-weight-bold">
                <div className="font-weight-bold small mb-2">Product Total</div>
                $0000.00
              </td>
              <td className="text-right">
                <Button variant="link">
                  <FontAwesomeIcon icon={faTimes} size="lg" className="text-danger" />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Card>
    </div>
  );
};
