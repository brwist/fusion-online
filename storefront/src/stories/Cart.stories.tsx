import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Cart, CartProps } from '../components/Cart/Cart';

export default {
  title: 'Cart',
  component: Cart
} as Meta;

const Template: Story<CartProps> = (args) => <Cart {...args} />;

export const Page = Template.bind({});
Page.args = {};
