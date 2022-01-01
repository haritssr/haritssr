import React from 'react';
import { styled } from '@stitches/react';
import { violet, blackA, mauve } from '@radix-ui/colors';
import { TextAlignLeftIcon, TextAlignCenterIcon, TextAlignRightIcon } from '@radix-ui/react-icons';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { SubTitle } from '@/components/DesignSystem';

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: mauve.mauve6,
  borderRadius: 4,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
});

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: 'white',
  color: mauve.mauve11,
  height: 35,
  width: 35,
  display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 1,
  '&:first-child': { marginLeft: 0, borderTopLeftRadius: 4, borderBottomLeftRadius: 4 },
  '&:last-child': { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  '&:hover': { backgroundColor: violet.violet3 },
  '&[data-state=on]': { backgroundColor: violet.violet5, color: violet.violet11 },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
});

// Exports
const ToggleGroup = StyledToggleGroup;
const ToggleGroupItem = StyledItem;

// Your app...
const ToggleGroupDemo = () => (
  <LayoutSubWorkToTopic title='ToggleGroup' href='/work/radix-ui' hrefName='Radix UI'>
    <SubTitle>A set of two-state buttons that can be toggled on or off.</SubTitle>
    <ToggleGroup type='single' defaultValue='center' aria-label='Text alignment'>
      <ToggleGroupItem value='left' aria-label='Left aligned'>
        <TextAlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value='center' aria-label='Center aligned'>
        <TextAlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value='right' aria-label='Right aligned'>
        <TextAlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  </LayoutSubWorkToTopic>
);

export default ToggleGroupDemo;
