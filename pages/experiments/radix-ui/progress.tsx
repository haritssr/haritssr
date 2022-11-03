import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import ExplanationList from '@/components/ExplanationList';

export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);
  // React.useEffect(() => setTimeout(() => setProgress(66), 500), []);
  return (
    <LayoutToExperiments title='Progress' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/accordion'
          name='Radix UI Accordion'
        />
        <ExplanationList>
          <li>
            Displays an indicator showing the completion progress of a task, typically displayed as
            a progress bar.
          </li>
        </ExplanationList>
      </SubTitle>
      <ProgressPrimitive.Root
        className='relative, h-5 w-full overflow-hidden rounded-full bg-zinc-700 sm:w-1/2'
        value={66}
      >
        <ProgressPrimitive.Indicator
          className='h-full border border-zinc-500 bg-white'
          style={{
            transition: 'width 660ms cubic-bezier(0.65, 0, 0.35, 1)',
            width: `${progress}%`,
          }}
        />
      </ProgressPrimitive.Root>
    </LayoutToExperiments>
  );
}
