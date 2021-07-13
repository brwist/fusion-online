import React, { useContext } from 'react';
import { Row, Col, Accordion, Card, Button, Table, Form, useAccordionToggle, AccordionContext, Container } from 'react-bootstrap';
import {useCart} from '@saleor/sdk'
import { OrderSummary } from './OrderSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark, faChevronDown, faChevronUp, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faBookmark as fasFaBookmark, faEllipsisH } from '@fortawesome/pro-solid-svg-icons';

import './cart.scss';

export interface CartProps {
  discount: any,
  items: any,
  removeItem: any,
  shippingPrice: any,
  subtotalPrice: any,
  totalPrice: any,
  updateItem: any,
  subtractItem: any
}

export const Cart: React.FC<CartProps> = ({
  discount,
  items,
  removeItem,
  shippingPrice,
  subtotalPrice,
  totalPrice,
  updateItem,
  subtractItem
}) => {
  function ContextAwareToggle({ eventKey, callback }: any) {
    const currentEventKey = useContext(AccordionContext);

    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );

    const isCurrentEventKey = currentEventKey === eventKey;

    return (
      <Button
        variant="link"
        className="py-0 pl-0 pr-3"
        onClick={decoratedOnClick}
      >
        <FontAwesomeIcon icon={isCurrentEventKey ? faChevronDown : faChevronUp} size="lg" />
      </Button>
    );
  }

  console.log("Items", items)
  console.log("subtotal", subtotalPrice)
  console.log("total", totalPrice)
  return (
    <Container>
    <div className="cart">
      <header>
        <Button variant="link">
          <FontAwesomeIcon icon={farFaBookmark} size="lg" className="mr-1" /> Move All to Parts List
        </Button>
        <Button variant="link">
          <FontAwesomeIcon icon={faTimes} size="lg" className="mr-1 text-danger" /> Remove List
        </Button>
      </header>

      <Row>
        <Col lg={9}>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="w-25 d-flex align-items-start">
                    <ContextAwareToggle eventKey="0" />

                    <div className="w-100">
                      <h5 className="text-capitalize">Shipment 1</h5>

                      <Row className="mx-n1 small">
                        <Col sm={6} className="px-1">
                          PRODUCTS:
                        </Col>
                        <Col sm={6} className="font-weight-bold px-1">
                          {items?.length}
                        </Col>
                      </Row>
                      <Row className="mx-n1 small">
                        <Col sm={6} className="px-1">
                          UNITS:
                        </Col>
                        <Col sm={6} className="font-weight-bold px-1">
                          450
                        </Col>
                      </Row>
                      <Row className="mx-n1 small">
                        <Col sm={6} className="px-1">
                          SUBTOTAL:
                        </Col>
                        <Col sm={6} className="font-weight-bold px-1">
                          {subtotalPrice}
                        </Col>
                      </Row>
                    </div>

                  </div>

                  <a href="#" className="pt-2 small">SCHEDULE DELIVERY DATE</a>

                  <Form.Group as={Row} controlId="deliver-to" className="small m-0" style={{'width': '45%'}}>
                    <Form.Label column sm={3} className="col-form-label-sm font-weight-bold px-1">
                      Deliver to
                    </Form.Label>
                    <Col sm={9} className="px-0">
                      <Form.Control as="select" size="sm" custom>
                        <option>123 Main St, Haverhill, MA 01835, USA</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Button variant="link" className="p-0">
                    <FontAwesomeIcon icon={faEllipsisH} size="lg" className="my-2" />
                  </Button>
                </div>

              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Table borderless striped responsive>
                  <thead className="border-bottom">
                    <tr>
                      <th className="text-center">Save</th>
                      <th>Product Details</th>
                      <th className="text-center">Qty Available</th>
                      <th className="text-center">Qty</th>
                      <th className="text-right">Unit Price</th>
                      <th className="text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <FontAwesomeIcon icon={farFaBookmark} />
                      </td>
                      <td>
                        <div className="small">
                          <strong className="text-uppercase">INTEL</strong> 123456789
                        </div>
                        <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                        <div className="small mt-1">
                          Spec Code: 123456 | Ordering Code: 123456
                        </div>
                      </td>
                      <td className="text-center font-weight-bold">1,000</td>
                      <td className="text-center">
                        <Form.Row className="align-items-center">
                          <Col sm={6}>
                            <Form.Group controlId="qty-1" className="m-0">
                              <Form.Label className="sr-only">Qty</Form.Label>
                              <Form.Control style={{'width': '60px'}} size="sm" type="text" placeholder="" value="100" />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="p-0">
                            <a href="#" className="small">SPLIT</a>
                          </Col>
                        </Form.Row>
                      </td>
                      <td className="text-right">
                        <div className="small">
                          <s>$10,000</s>
                        </div>
                        <div className="font-weight-bold text-primary">$000.00</div>
                      </td>
                      <td className="text-right font-weight-bold">$000.00</td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <FontAwesomeIcon icon={farFaBookmark} />
                      </td>
                      <td>
                        <div className="small">
                          <strong className="text-uppercase">INTEL</strong> 123456789
                        </div>
                        <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                        <div className="small mt-1">
                          Spec Code: 123456 | Ordering Code: 123456
                        </div>
                      </td>
                      <td className="text-center font-weight-bold">1,000</td>
                      <td className="text-center">
                        <Form.Row className="align-items-center">
                          <Col sm={6}>
                            <Form.Group controlId="qty-2" className="m-0">
                              <Form.Label className="sr-only">Qty</Form.Label>
                              <Form.Control style={{'width': '60px'}} size="sm" type="text" placeholder="" value="100" />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="p-0">
                            <a href="#" className="small">SPLIT</a>
                          </Col>
                        </Form.Row>
                      </td>
                      <td className="text-right">
                        <div className="small">
                          <s>$10,000</s>
                        </div>
                        <div className="font-weight-bold text-primary">$000.00</div>
                      </td>
                      <td className="text-right font-weight-bold">$000.00</td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <FontAwesomeIcon icon={farFaBookmark} />
                      </td>
                      <td>
                        <div className="small">
                          <strong className="text-uppercase">INTEL</strong> 123456789
                        </div>
                        <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                        <div className="small mt-1">
                          Spec Code: 123456 | Ordering Code: 123456
                        </div>
                      </td>
                      <td className="text-center font-weight-bold">1,000</td>
                      <td className="text-center">
                        <Form.Row className="align-items-center">
                          <Col sm={6}>
                            <Form.Group controlId="qty-3" className="m-0">
                              <Form.Label className="sr-only">Qty</Form.Label>
                              <Form.Control style={{'width': '60px'}} size="sm" type="text" placeholder="" value="100" />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="p-0">
                            <a href="#" className="small">SPLIT</a>
                          </Col>
                        </Form.Row>
                      </td>
                      <td className="text-right">
                        <div className="small">
                          <s>$10,000</s>
                        </div>
                        <div className="font-weight-bold text-primary">$000.00</div>
                      </td>
                      <td className="text-right font-weight-bold">$000.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-top">
                      <td colSpan={4}></td>
                      <td className="text-right">
                        Subtotal
                      </td>
                      <td className="font-weight-bold text-right">
                        $0000.00
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Card.Header>
                <div className="d-flex justify-content-between align-items-start">
                  <div className="w-25 d-flex align-items-start">
                    <ContextAwareToggle eventKey="1" />

                    <div className="w-100">
                      <h5 className="text-capitalize">Shipment 1</h5>

                      <Row className="mx-n1 small">
                        <Col sm={6} className="px-1">
                          PRODUCTS:
                        </Col>
                        <Col sm={6} className="font-weight-bold px-1">
                          3
                        </Col>
                      </Row>
                      <Row className="mx-n1 small">
                        <Col sm={6} className="px-1">
                          UNITS:
                        </Col>
                        <Col sm={6} className="font-weight-bold px-1">
                          450
                        </Col>
                      </Row>
                      <Row className="mx-n1 small">
                        <Col sm={6} className="px-1">
                          SUBTOTAL:
                        </Col>
                        <Col sm={6} className="font-weight-bold px-1">
                          $0000.00
                        </Col>
                      </Row>
                    </div>

                  </div>

                  <a href="#" className="pt-2 small">SCHEDULE DELIVERY DATE</a>

                  <Form.Group as={Row} controlId="deliver-to" className="small m-0" style={{'width': '45%'}}>
                    <Form.Label column sm={3} className="col-form-label-sm font-weight-bold px-1">
                      Deliver to
                    </Form.Label>
                    <Col sm={9} className="px-0">
                      <Form.Control as="select" size="sm" custom>
                        <option>123 Main St, Haverhill, MA 01835, USA</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Button variant="link" className="p-0">
                    <FontAwesomeIcon icon={faEllipsisH} size="lg" className="my-2" />
                  </Button>
                </div>

              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Table borderless striped responsive>
                  <thead className="border-bottom">
                    <tr>
                      <th className="text-center">Save</th>
                      <th>Product Details</th>
                      <th className="text-center">Qty Available</th>
                      <th className="text-center">Qty</th>
                      <th className="text-right">Unit Price</th>
                      <th className="text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <FontAwesomeIcon icon={farFaBookmark} />
                      </td>
                      <td>
                        <div className="small">
                          <strong className="text-uppercase">INTEL</strong> 123456789
                        </div>
                        <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                        <div className="small mt-1">
                          Spec Code: 123456 | Ordering Code: 123456
                        </div>
                      </td>
                      <td className="text-center font-weight-bold">1,000</td>
                      <td className="text-center">
                        <Form.Row className="align-items-center">
                          <Col sm={6}>
                            <Form.Group controlId="qty-1" className="m-0">
                              <Form.Label className="sr-only">Qty</Form.Label>
                              <Form.Control style={{'width': '60px'}} size="sm" type="text" placeholder="" value="100" />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="p-0">
                            <a href="#" className="small">SPLIT</a>
                          </Col>
                        </Form.Row>
                      </td>
                      <td className="text-right">
                        <div className="small">
                          <s>$10,000</s>
                        </div>
                        <div className="font-weight-bold text-primary">$000.00</div>
                      </td>
                      <td className="text-right font-weight-bold">$000.00</td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <FontAwesomeIcon icon={farFaBookmark} />
                      </td>
                      <td>
                        <div className="small">
                          <strong className="text-uppercase">INTEL</strong> 123456789
                        </div>
                        <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                        <div className="small mt-1">
                          Spec Code: 123456 | Ordering Code: 123456
                        </div>
                      </td>
                      <td className="text-center font-weight-bold">1,000</td>
                      <td className="text-center">
                        <Form.Row className="align-items-center">
                          <Col sm={6}>
                            <Form.Group controlId="qty-2" className="m-0">
                              <Form.Label className="sr-only">Qty</Form.Label>
                              <Form.Control style={{'width': '60px'}} size="sm" type="text" placeholder="" value="100" />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="p-0">
                            <a href="#" className="small">SPLIT</a>
                          </Col>
                        </Form.Row>
                      </td>
                      <td className="text-right">
                        <div className="small">
                          <s>$10,000</s>
                        </div>
                        <div className="font-weight-bold text-primary">$000.00</div>
                      </td>
                      <td className="text-right font-weight-bold">$000.00</td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <FontAwesomeIcon icon={farFaBookmark} />
                      </td>
                      <td>
                        <div className="small">
                          <strong className="text-uppercase">INTEL</strong> 123456789
                        </div>
                        <a href="#">Intel® Pentium® Gold 7505 Processor</a>
                        <div className="small mt-1">
                          Spec Code: 123456 | Ordering Code: 123456
                        </div>
                      </td>
                      <td className="text-center font-weight-bold">1,000</td>
                      <td className="text-center">
                        <Form.Row className="align-items-center">
                          <Col sm={6}>
                            <Form.Group controlId="qty-3" className="m-0">
                              <Form.Label className="sr-only">Qty</Form.Label>
                              <Form.Control style={{'width': '60px'}} size="sm" type="text" placeholder="" value="100" />
                            </Form.Group>
                          </Col>
                          <Col sm={6} className="p-0">
                            <a href="#" className="small">SPLIT</a>
                          </Col>
                        </Form.Row>
                      </td>
                      <td className="text-right">
                        <div className="small">
                          <s>$10,000</s>
                        </div>
                        <div className="font-weight-bold text-primary">$000.00</div>
                      </td>
                      <td className="text-right font-weight-bold">$000.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-top">
                      <td colSpan={4}></td>
                      <td className="text-right">
                        Subtotal
                      </td>
                      <td className="font-weight-bold text-right">
                        $0000.00
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Col>

        <Col lg={3}>
          <OrderSummary />
        </Col>
      </Row>
    </div>
    </Container>
  );
};
