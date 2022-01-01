import { SubTitle, TitleBack } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
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
    <LayoutSubWorkToTopic title='useEffect' href='/work/react' hrefName='React'>
      <SubTitle>Ya</SubTitle>
    </LayoutSubWorkToTopic>
  );
}
