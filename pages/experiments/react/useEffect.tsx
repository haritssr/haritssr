import { SubTitle, TitleBack } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useEffect } from 'react';

export default function UseEffect() {
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  const handleScroll = () => {
    console.log(Math.round(scrollY));
  };
  return (
    <LayoutToExperiments title='useEffect' domain='React'>
      <SubTitle>Ya</SubTitle>
    </LayoutToExperiments>
  );
}
