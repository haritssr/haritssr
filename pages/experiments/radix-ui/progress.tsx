import React from 'react';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: 'relative',
  overflow: 'hidden',
  background: blackA.blackA9,
  borderRadius: '99999px',
  width: 300,
  height: 25,
});

const StyledIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: 'white',
  height: '100%',
  transition: 'width 660ms cubic-bezier(0.65, 0, 0.35, 1)',
});

// Exports
export const Progress = StyledProgress;
export const ProgressIndicator = StyledIndicator;

// Your app...
export default function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);
  // React.useEffect(() => setTimeout(() => setProgress(66), 500), []);
  return (
    <LayoutToExperiments title='Progress' domain='Radix UI'>
      <SubTitle>
        Displays an indicator showing the completion progress of a task, typically displayed as a
        progress bar.
      </SubTitle>
      <Progress value={66} className='rounded-full'>
        <ProgressIndicator style={{ width: `${progress}%` }} className='border border-zinc-500' />
      </Progress>
    </LayoutToExperiments>
  );
}
