import React from 'react';
import { Story, Meta } from '@storybook/react';

import { SpendReport, SpendReportProps } from '../components/MyAccount/SpendReport';

export default {
  title: 'My Account Spend Report',
  component: SpendReport
} as Meta;

const Template: Story<SpendReportProps> = (args) => <SpendReport {...args} />;

export const Table = Template.bind({});
Table.args = {};
