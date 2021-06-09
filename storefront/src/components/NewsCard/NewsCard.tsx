import React from 'react';
import { Card, Button } from 'react-bootstrap';
import CardImg from '../../img/fidel-fernando-DubQVeFFbFQ-unsplash.jpg';

export interface NewsCardProps {
  date: string;
  title: string;
  text: string;
  buttonSize?: 'sm' | 'lg';
  buttonVariant?: 'primary' | 'secondary';
  buttonLabel: string;
  onClick?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  date,
  title,
  text,
  buttonSize,
  buttonVariant = 'primary',
  buttonLabel,
  ...props
}) => {
  return (
    <Card>
      <Card.Img variant="top" src={CardImg} />
      <Card.Body>
        <Card.Subtitle className="mb-3">{date}</Card.Subtitle>
        <Card.Title as="h3">{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Button variant={buttonVariant} size={buttonSize}>
          {buttonLabel}
        </Button>
      </Card.Body>
    </Card>
  );
};
