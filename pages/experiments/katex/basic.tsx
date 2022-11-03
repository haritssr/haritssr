import LayoutToExperiments from '@/components/LayoutToExperiments';
import SubTitle from '@/components/SubTitle';
import katexify from '../../../utils/katexify';

export default function ExportedDialog() {
  return (
    <LayoutToExperiments title='Basic' domain='KaTeX'>
      <SubTitle>Basic example</SubTitle>
      {katexify(`\\text{house-price} = \\hat{\\beta_1} * sqft + \\hat{\\beta_0}`, false)}
    </LayoutToExperiments>
  );
}
