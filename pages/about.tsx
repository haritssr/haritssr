import { TitleBackHome } from '@/components/DesignSystem';
import Layout from '@/components/Layout';

import Hello from '@/components/about/Hello';
import WebTech from '@/components/about/WebTech';
import Tools from '@/components/about/Tools';
import Contact from '@/components/about/Contact';
import OnboardedWebsite from '@/components/about/OnboardedWebsite';
import InspirationDesignSources from '@/components/about/InspirationDesignSources';

export default function About() {
  return (
    <Layout browserTitle='About' description='About'>
      <TitleBackHome name='About Me' />
      <div className='grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2'>
        <Hello />
        <WebTech />
        <Tools />
        <Contact />
        <OnboardedWebsite />
        <InspirationDesignSources />
      </div>
    </Layout>
  );
}
