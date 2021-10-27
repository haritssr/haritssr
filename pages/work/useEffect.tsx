import { TitleBack } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
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
    <Layout browserTitle='UseEffect' description='UseEffect'>
      <TitleBack back='work' name='UseEffect' />
    </Layout>
  );
}
