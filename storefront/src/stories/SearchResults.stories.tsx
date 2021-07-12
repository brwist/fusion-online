import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ProductTable, ProductTableProps } from '../components/ProductTable/ProductTable';
import {productDataSample} from './productDataSample'

export default {
  title: 'Search/Search Results Table',
  component: ProductTable
} as Meta;

const Template: Story<ProductTableProps> = (args) => <ProductTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
productData: [
    {otherData: {saved: false, status: "Incoming Stock"},
      products: productDataSample
    },
    {otherData: {saved: true, status: "Incoming Stock"},
      products: productDataSample
    },
    {otherData: {saved: false, status: "Incoming Stock"},
      products: productDataSample
    },
    {otherData: {saved: false, status: "Incoming Stock"},
      products: productDataSample
    },
  ]
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
