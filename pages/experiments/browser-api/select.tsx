import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function Select() {
  return (
    <LayoutToExperiments title='Select' domain='Browser API'>
      <SubTitle>Browser built in select api.</SubTitle>
      <select name='pets' id='pet-select'>
        <option value=''>--Please choose an option--</option>
        <option value='dog'>Dog</option>
        <option value='cat'>Cat</option>
        <option value='hamster'>Hamster</option>
        <option value='parrot'>Parrot</option>
        <option value='spider'>Spider</option>
        <option value='goldfish'>Goldfish</option>
      </select>
    </LayoutToExperiments>
  );
}
