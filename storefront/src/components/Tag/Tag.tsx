import React from 'react';
import { Badge } from 'react-bootstrap';

import './tag.scss';

export interface TagProps {
  size?: 'sm' | 'lg';
  label: string;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  size = 'lg',
  label,
  ...props
}) => {
  return (
    <Badge
      pill
      variant="dark"
      className={['tag', `tag--${size}`].join(' ')}
    >
      {label}
    </Badge>
  );
};
