import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Tag, TagProps } from '../components/Tag/Tag';

export default {
  title: 'Tag',
  component: Tag
} as Meta;

const Template: Story<TagProps> = (args) => <Tag {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  variant: 'secondary',
  label: 'Large Tag'
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  variant: 'secondary',
  label: 'Small Tag'
};

