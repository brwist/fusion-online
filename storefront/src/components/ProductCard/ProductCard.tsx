import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Tag } from '../../components/Tag/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farFaBookmark } from '@fortawesome/pro-regular-svg-icons';
// eslint-disable-next-line
import { faBookmark as fasFaBookmark } from '@fortawesome/pro-solid-svg-icons';

import './productcard.scss';

export interface ProductCardProps {
  title: string;
  buttonSize?: 'sm' | 'lg';
  buttonVariant?: 'primary' | 'secondary';
  buttonLabel: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  buttonSize,
  buttonVariant = 'primary',
  buttonLabel,
  onClick,
  ...props
}) => {
  return (
    <Card className="product-card">
      <Card.Body>
        <Card.Subtitle className="mb-3 d-flex justify-content-between align-items-center">
          <div>
            <strong>INTEL</strong> 123456789
          </div>
          <Tag label="Desktop" variant="secondary" size="sm" />
        </Card.Subtitle>
        <Card.Title as="h3">
          <Button variant="link">{title}</Button>
        </Card.Title>
        <Card.Text>
          <div className="small mb-3">
            Spec Code: 123456 | Ordering Code: 123456
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <div className="font-weight-bold">Available Qty</div>
              <div className="text-larger">10,000</div>
            </div>
            <div className="text-right">
              <div className="small">
                <s>$10,000</s>
              </div>
              <div className="text-larger">
                <strong className="text-primary">$9,985</strong>/unit
              </div>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant={buttonVariant} size={buttonSize} onClick={onClick}>
          {buttonLabel}
        </Button>
        <Button variant="link">
          <FontAwesomeIcon icon={farFaBookmark} className="mr-1" /> Add to List
        </Button>
      </Card.Footer>
    </Card>
  );
};
