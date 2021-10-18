import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import './helpblock.scss';

export interface HelpBlockProps {}

export const HelpBlock: React.FC<HelpBlockProps> = ({}) => {
  return (
    <section className="help-block">
      <Row>
        <Col lg={7}>
          <div className="small section-header pb-3">
            <svg width="35px" height="15px" viewBox="0 0 35 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="Member" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Components" transform="translate(-160.000000, -2982.000000)" fill="#DDDDDD">
                  <g id="CPU---Single-Order" transform="translate(160.000000, 2894.000000)">
                    <g id="subheading-scale" transform="translate(0.000000, 88.000000)">
                      <polygon className="active" id="Rectangle1" points="8.37051392 0 15.3705139 0 7 14.2763062 1.00255103e-14 14.2763062"></polygon>
                      <polygon className="active" id="Rectangle2" points="17.3705139 0 24.3705139 0 16 14.2763062 9 14.2763062"></polygon>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
            How Can We Help?
          </div>
          <h3>If you have questions, we've got you covered.</h3>
        </Col>
        <Col lg={5} className="text-lg-right">
          <Button variant="primary" size="lg" className="mx-3" type="button">Chat Now</Button>
          <Button variant="primary" size="lg" className="mx-3" type="button">Email Us</Button>
        </Col>
      </Row>
    </section>
  );
};
