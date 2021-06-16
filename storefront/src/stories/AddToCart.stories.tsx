import React from 'react';
import { Story, Meta } from '@storybook/react';

import { AddToCart, AddToCartProps } from '../components/AddToCart/AddToCart';

export default {
  title: 'Add to Cart',
  component: AddToCart
} as Meta;

const Template: Story<AddToCartProps> = (args) => <AddToCart {...args} />;

export const Card = Template.bind({});
Card.args = {};
