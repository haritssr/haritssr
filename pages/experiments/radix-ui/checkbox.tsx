import React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';

import ExplanationList from '@/components/ExplanationList';

export default function ExportedCheckbox() {
  return (
    <LayoutToExperiments title='CheckBox' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/checkbox'
          name='Radix UI Checkbox'
        />
        <ExplanationList>
          <li>A control that allows the user to toggle between checked and not checked.</li>
          <li>Click the checklist button and the state will change.</li>
        </ExplanationList>
      </SubTitle>
      <form>
        <div className='align-center flex'>
          <CheckboxPrimitive.Root
            className='flex h-6 w-6 items-center justify-center rounded-md border border-zinc-300 bg-white shadow hover:bg-purple-50'
            // defaultChecked
            id='c1'
          >
            <CheckboxPrimitive.Indicator className='text-blue-600'>
              <CheckIcon />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          <label className='select-none pl-4 text-zinc-700' htmlFor='c1'>
            Accept terms and conditions.
          </label>
        </div>
      </form>
    </LayoutToExperiments>
  );
}
