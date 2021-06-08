import React from 'react';
import Button from 'react-bootstrap/Button';

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
    <Button
      className={['tag', `tag--${size}`].join(' ')}
      size={size}
      {...props}
    >
      {label}
    </Button>
  );
};
