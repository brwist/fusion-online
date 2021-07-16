import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ProductTableRow, ProductTableRowProps } from '../components/ProductTable/ProductTableRow';
import {productDataSample} from './productDataSample'
import { useCart } from "@saleor/sdk";

export default {
  title: 'Products/Product Table Row',
  component: ProductTableRow
} as Meta;

const Template: Story<ProductTableRowProps> = (args) => {
  const {addItem} = useCart()
  return <ProductTableRow {...args} addItem={addItem} />};

export const Default = Template.bind({});
Default.args = {
  otherData: {
    saved: false,
    status: "Incoming Stock",
  },
  product: productDataSample,
};

export const Saved = Template.bind({});
Saved.args = {
  otherData: {
    status: "Incoming Stock",
    saved: true
  },
  product: productDataSample,
};