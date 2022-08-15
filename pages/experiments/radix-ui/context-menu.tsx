import React from 'react';
import { styled } from '@stitches/react';
import { violet, mauve } from '@radix-ui/colors';
import { DotFilledIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import ExplanationList from '@/components/ExplanationList';

export default function ExportedContextMenu() {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState('pedro');

  return (
    <LayoutToExperiments title='Context Menu' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/context-menu'
          name='Radix UI Context Menu'
        />
        <ExplanationList>
          <li>
            Displays a menu located at the pointer, triggered by a right-click or a long-press.
          </li>
          <li>
            Right click on the spscific area to see the option menu appear where each button inside
            them are act like an action to do specific thing on site.
          </li>
        </ExplanationList>
      </SubTitle>
    </LayoutToExperiments>
  );
}
