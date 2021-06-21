import React from 'react';
import { Story, Meta } from '@storybook/react';

import { OrderDetails, OrderDetailsProps } from '../components/MyAccount/OrderDetails';

export default {
  title: 'My Account Order Details',
  component: OrderDetails
} as Meta;

const Template: Story<OrderDetailsProps> = (args) => <OrderDetails {...args} />;

export const Page = Template.bind({});
Page.args = {};
