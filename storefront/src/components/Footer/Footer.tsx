import React from 'react';
import { Container, Nav } from 'react-bootstrap';

import './footer.scss';

export interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({
  ...props
}) => {
  return (
    <footer id="footer">
      <Container>
        <div className="d-flex flex-column align-items-end">
          <Nav as="ul" id="footer-nav">
            <Nav.Item as="li" className="active">
              <Nav.Link href="#">Privacy Policy</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#">Purchase Order Terms &amp; Conditions</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="#">Sales Terms &amp; Conditions</Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="copyright">
            &copy; 2021 Fusion Worldwide. All Rights Reserved.
          </div>
        </div>

      </Container>
    </footer>
  );
};
