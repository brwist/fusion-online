import React, { useState } from 'react';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark, faShoppingCart } from '@fortawesome/pro-regular-svg-icons';
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';

import { Product } from '../../generated/graphql';

import './producttable.scss';

export interface ProductTableRowProps {
  otherData: {
    saved: boolean,
    status?: string | undefined,
  },
  product: Product,
}
export const ProductTableRow: React.FC<ProductTableRowProps> = ({ otherData: {
  saved,
  status},
  product: {
    name,
    id,
    variants,
    attributes,
    pricing
  }
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getAttributeValue (slugName: string): any {
    const matchingAttribute = attributes.filter(
      ({attribute: {slug}}) => slug === slugName)
    return matchingAttribute[0] && matchingAttribute[0].values[0]?.name
  }

  return (<tr>
    <td className="pr-0">
      {saved ? <FontAwesomeIcon icon={fasFaBookmark} className="text-primary" />
        : <FontAwesomeIcon icon={farFaBookmark} />}
    </td>
    <td>
      <div className="small">
        <strong className="text-uppercase">{getAttributeValue("manufacturer")}</strong> {variants && variants[0]?.sku}
      </div>
      <a href={`/products/${id}`}>{name}</a>
      <div className="small mt-1">
        Spec Code: {getAttributeValue("spec-code")} | Ordering Code: {getAttributeValue("ordering-code")}
      </div>
    </td>
    <td className="text-center">{status}</td>
    <td className="text-center">{variants && variants[0]?.quantityAvailable}</td>
    <td className="text-center">${pricing?.priceRangeUndiscounted?.start?.gross.amount}</td>
    <td className="text-center">
      <Button variant="primary" onClick={handleShow}>
        Select Quantity
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        centered
      >
        <Form>
          <Modal.Header>
            <Modal.Title className="mb-0">Select Quantity to Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table borderless className="mb-0">
              <thead>
                <tr>
                  <th>Available Quantity</th>
                  <th>Quantity<span className="text-danger">*</span></th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10,000</td>
                  <td>
                    <Form.Group controlId="quantity">
                      <Form.Label className="sr-only">Quantity</Form.Label>
                      <Form.Control type="number" style={{'maxWidth' : '80px'}} required />
                    </Form.Group>
                  </td>
                  <td>$000.00</td>
                  <td>$000.00</td>
                </tr>
              </tbody>
            </Table>

            <em>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</em>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary" onClick={handleClose}>
              Add to Order <FontAwesomeIcon icon={faShoppingCart} />
            </Button>
            <Button variant="link" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </td>
  </tr>)
}
