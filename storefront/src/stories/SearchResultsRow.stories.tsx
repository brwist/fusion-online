import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SearchResultRow, SearchResultRowProps } from '../components/SearchResults/SearchResultRow';

export default {
  title: 'Search/Search Results Row',
  component: SearchResultRow
} as Meta;

const Template: Story<SearchResultRowProps> = (args) => <SearchResultRow {...args} />;

export const Default = Template.bind({});
Default.args = {
  otherData: {
    saved: false,
    brand: "INTEL",
    sku: 123456789,
    specCode: 123456,
    orderingCode: 123456,
    status: "Incoming Stock",
    qtyAvailable: 10000,
    price: 100.00,
  },
  productData: {
    node: {
      id: "UHJvZHVjdDo3",
      name: "Intel® Celeron® Processor N3010",
      description: "",
      descriptionJson: "",
      productType: {
        id: "UHJvZHVjdFR5cGU6NA==",
        name: "Intel® Celeron® Processor N Series",
        hasVariants: false,
        slug: 'intel',
        isShippingRequired: true,
        isDigital: false,
        privateMetadata: [],
        metadata:[],
        privateMeta: [],
        meta: []
      },
      slug: 'intel',
      chargeTaxes: false,
      visibleInListings: true,
      privateMetadata: [],
      metadata:[],
      privateMeta: [],
      meta: [],
      url: 'string',
      attributes: [],
      isPublished: true
    },
    cursor: "string"
  }
};

export const Saved = Template.bind({});
Saved.args = {
  // result: {
  //   ...Default.args.result,
  //   saved: true
  // }
};