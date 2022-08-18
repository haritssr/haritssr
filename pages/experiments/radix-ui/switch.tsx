import React from 'react';
import { styled } from '@stitches/react';
import { violet, mauve, blackA, whiteA } from '@radix-ui/colors';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import ExplanationList from '@/components/ExplanationList';
import * as Switch from '@radix-ui/react-switch';

export default function ExportedSwitch() {
  return (
    <LayoutToExperiments title='Switch' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/switch'
          name='Radix UI Switch'
        />
        <ExplanationList>
          <li>A control that allows the user to toggle between checked and not checked.</li>
          <li>Click to change state.</li>
        </ExplanationList>
      </SubTitle>
      <form>
        <label>Airplane mode</label>
        <Switch.Root defaultChecked id='s1' className='block h-5 w-5 bg-zinc-400 shadow-lg'>
          <Switch.Thumb className='rdx-state-checked:translate-x-10 block h-2 w-3 rounded-full bg-rose-500 will-change-transform' />
        </Switch.Root>
      </form>
    </LayoutToExperiments>
  );
}
