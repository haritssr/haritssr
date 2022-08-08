import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function Details() {
  return (
    <LayoutToExperiments title='Details' domain='Browser'>
      <SubTitle>Broser built-in disclosure. Can only expand by clicking the arrow button.</SubTitle>
      <details className='cursor-pointer'>
        <summary>Expand this</summary>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque dolores debitis eius?
        Quidem corporis adipisci maiores exercitationem deleniti? Nesciunt, incidunt.
      </details>
    </LayoutToExperiments>
  );
}
