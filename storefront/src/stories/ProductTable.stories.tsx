import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ProductTable, ProductTableProps } from '../components/ProductTable/ProductTable';
import {productDataSample} from './productDataSample'
import {useCart} from '@saleor/sdk'

export default {
  title: 'Products/Product Table',
  component: ProductTable
} as Meta;

const Template: Story<ProductTableProps> = (args) => {
  const {addItem} = useCart();

  return <ProductTable {...args} addItem={addItem} />};

export const Default = Template.bind({});
Default.args = {
  loading: false,
  productData: [
    {otherData: {saved: false, status: "Incoming Stock"},
      product: productDataSample,
    },
    {otherData: {saved: true, status: "Incoming Stock"},
      product: productDataSample,
    },
    {otherData: {saved: false, status: "Incoming Stock"},
      product: productDataSample,
    },
    {otherData: {saved: false, status: "Incoming Stock"},
      product: productDataSample,
    },
  ],
  
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};

export const Empty = Template.bind({});
Empty.args = {
  loading: false,
  productData: []
};
