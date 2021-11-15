import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Table, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark, faShoppingCart } from '@fortawesome/pro-regular-svg-icons';
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';
import manufacturers from '../../utils/manufacturers.json'
import { Product } from '../../generated/graphql';

import './producttable.scss';

export interface ProductTableRowProps {
  product: Product,
  addItem?: any,
  userApproval: boolean | undefined,
  updateSelectedProduct: (productName: string) => void,
  updateSelectedQuantity: (quantity: number) => void,
  showItemAddedAlert: () => void
}
export const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  addItem,
  userApproval,
  updateSelectedProduct,
  updateSelectedQuantity,
  showItemAddedAlert
}) => {
  const [show, setShow] = useState(false);
  const [quantitySelected, setQuantitySelected] = useState(1)

  const handleAddToCart = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if(product?.defaultVariant) {
      addItem(product?.defaultVariant.id, quantitySelected)
      updateSelectedQuantity(quantitySelected)
      updateSelectedProduct(product?.name)
      showItemAddedAlert()
      setShow(false)
    }
  }

  const unitPrice = (product?.pricing?.priceRangeUndiscounted?.start?.gross.amount || 0).toFixed(2)

  function getAttributeValue (slugName: string): any {
    const matchingAttribute = product?.attributes?.filter(
      ({attribute: {slug}}) => slug === slugName)
    return matchingAttribute[0] && matchingAttribute[0].values[0]?.name
  }
  const getMetadataValue = (key) => product?.metadata.find(pair => pair.key === key)?.value
  const productMcode = getMetadataValue("mcode")
  const manufacturer = manufacturers.find(({mcode, manufacturer}) => mcode === productMcode)?.manufacturer || productMcode
  console.log(product)
  return (<tr>
    <td className="pr-0">
      <FontAwesomeIcon icon={farFaBookmark} />
    </td>
    <td>
      <div className="small">
        <strong className="text-uppercase">{manufacturer}</strong> {product?.defaultVariant?.sku}
      </div>
      <Link style={{textDecoration: "underline"}} to={`/products/${product?.slug}`}>{product?.name}</Link>
      <div className="small mt-1">
        Spec Code: {getMetadataValue("mpn")} | Ordering Code: { product?.attributes && getAttributeValue("ordering-code")}
      </div>
    </td>
    <td className="text-center">{userApproval ? 'Incoming Stock' : '--'}</td>
    <td className="text-center">{userApproval ? product?.defaultVariant?.quantityAvailable : '--'}</td>
    <td className="text-center">{unitPrice !== "0.00" ? `$${unitPrice}` : `--`}</td>
    <td className="text-center">
      <Button variant="primary" onClick={() => setShow(true)} disabled={!userApproval}>
        Select Quantity
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
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
                  <td>{product?.defaultVariant?.quantityAvailable}</td>
                  <td>
                    <Form.Group controlId="quantity">
                      <Form.Label className="sr-only">Quantity</Form.Label>
                      <Form.Control 
                        type="number"
                        style={{'maxWidth' : '80px'}}
                        required 
                        min={1}
                        max={(product?.defaultVariant?.quantityAvailable )|| 1}
                        value={quantitySelected}
                        onChange={(e) => setQuantitySelected(parseInt(e.currentTarget.value))}
                      />
                    </Form.Group>
                  </td>
                  <td>${unitPrice}</td>
                  <td>${(quantitySelected * parseInt(unitPrice)).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>

            <em>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</em>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary" onClick={handleAddToCart}>
              Add to Order <FontAwesomeIcon icon={faShoppingCart} />
            </Button>
            <Button variant="link" onClick={() => setShow(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </td>
  </tr>)
}
