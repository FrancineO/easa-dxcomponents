/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';

import EasaExtensionsImageUrl from './index';
import { stateProps, configProps } from './mock';

const meta: Meta<typeof EasaExtensionsImageUrl> = {
  title: 'Fields/Image URL',
  argTypes: {
    alignment: {
      options: ['left', 'center', 'right'],
      control: { type: 'radio' }
    }
  },
  component: EasaExtensionsImageUrl
};

export default meta;
type Story = StoryObj<typeof EasaExtensionsImageUrl>;

export const BaseEasaExtensionsImageUrl: Story = args => {
  const props = {
    value: configProps.value,
    source: configProps.source,
    altText: configProps.altText,
    width: configProps.width,
    alignment: configProps.alignment
  };

  return (
    <>
      <EasaExtensionsImageUrl {...props} {...args} />
    </>
  );
};

BaseEasaExtensionsImageUrl.args = {
  value: 'https://www.pega.com/themes/custom/pegawww_theme/images/pega-logo.svg',
  source:
    configProps.source || 'https://www.pega.com/themes/custom/pegawww_theme/images/pega-logo.svg',
  altText: configProps.altText || 'Pega',
  width: configProps.width || 100,
  alignment: stateProps.alignment || 'left'
};
