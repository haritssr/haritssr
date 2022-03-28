import React from 'react';
import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import { CheckIcon } from '@radix-ui/react-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  all: 'unset',
  backgroundColor: 'white',
  width: 25,
  height: 25,
  borderRadius: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: violet.violet3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: violet.violet11,
});

// Exports
const Checkbox = StyledCheckbox;
const CheckboxIndicator = StyledIndicator;

// Your app...
const Flex = styled('div', { display: 'flex' });
const Label = styled('label', {
  color: 'white',
  fontSize: 15,
  lineHeight: 1,
  userSelect: 'none',
});

export default function CheckboxDemo() {
  return (
    <LayoutToExperiments title='CheckBox' domain='Radix UI'>
      <SubTitle>A control that allows the user to toggle between checked and not checked.</SubTitle>
      <form>
        <Flex css={{ alignItems: 'center' }}>
          <Checkbox defaultChecked id='c1'>
            <CheckboxIndicator>
              <CheckIcon />
            </CheckboxIndicator>
          </Checkbox>
          <Label css={{ paddingLeft: 15 }} htmlFor='c1'>
            Accept terms and conditions.
          </Label>
        </Flex>
      </form>
    </LayoutToExperiments>
  );
}
