import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ProductTableRow, ProductTableRowProps } from '../components/ProductTable/ProductTableRow';
import {productDataSample} from './productDataSample'

export default {
  title: 'Search/Search Results Row',
  component: ProductTableRow
} as Meta;

const Template: Story<ProductTableRowProps> = (args) => <ProductTableRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  otherData: {
    saved: false,
    status: "Incoming Stock",
  },
  products: productDataSample
};

export const Saved = Template.bind({});
Saved.args = {
  otherData: {
    status: "Incoming Stock",
    saved: true
  },
  products: productDataSample
};