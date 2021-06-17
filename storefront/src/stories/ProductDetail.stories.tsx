import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ProductDetail, ProductDetailProps } from '../components/ProductDetail/ProductDetail';

export default {
  title: 'Product Detail',
  component: ProductDetail
} as Meta;

const Template: Story<ProductDetailProps> = (args) => <ProductDetail {...args} />;

export const Page = Template.bind({});
Page.args = {};
