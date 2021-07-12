import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ProductCard, ProductCardProps } from '../components/ProductCard/ProductCard';

export default {
  title: 'Products/Product Card',
  component: ProductCard
} as Meta;

const Template: Story<ProductCardProps> = (args) => <ProductCard {...args} />;

export const Card = Template.bind({});
Card.args = {
  title: 'Intel® Pentium® Gold 7505 Processor',
  buttonSize: 'sm',
  buttonVariant: 'primary',
  buttonLabel: 'Select Quantity'
};
