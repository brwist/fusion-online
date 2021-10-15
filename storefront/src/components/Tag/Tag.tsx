import React from 'react';
import { Badge } from 'react-bootstrap';

import './tag.scss';

export interface TagProps {
  size?: 'sm' | 'lg',
  variant?: 'primary' | 'secondary',
  label: string,
  onClick?: () => void,
}

export const Tag: React.FC<TagProps> = ({
  size = 'lg',
  variant = 'secondary',
  label,
  ...props
}) => {
  return (
    <Badge
      pill
      variant={variant}
      className={['tag', `tag--${size}`].join(' ')}
    >
      {label}
    </Badge>
  );
};
