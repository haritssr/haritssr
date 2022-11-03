import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';
import ExplanationList from '@/components/ExplanationList';

export default function ExportedToast() {
  return (
    <LayoutToExperiments title='Toast' domain='Radix UI'>
      <SubTitle>
        <ExternalLink
          href='https://www.radix-ui.com/docs/primitives/components/toast'
          name='Radix UI Toast'
        />
        <ExplanationList>
          <li>A succinct message that is displayed temporarily.</li>
          <li>Click and come up on right bottom, click undo or close to dissapear.</li>
        </ExplanationList>
      </SubTitle>
      {/* <ToastDemo /> */}
    </LayoutToExperiments>
  );
}
