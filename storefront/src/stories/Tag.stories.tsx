import React from 'react';
import { Story, Meta } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css'

import { Tag, TagProps } from '../components/Tag/Tag';

export default {
  title: 'tag', 
  component: Tag
} as Meta;

const Template: Story<TagProps> = (args) => <Tag {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  label: 'Large Tag'
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm', 
  label: 'Small Tag'
}

