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
      <h1 className='z-40 block w-full h-auto pt-16 pb-8 mx-auto text-3xl font-bold text-left text-gray-800 sm:text-4xl'>
        About Me
      </h1>
      <div className='grid grid-cols-1 gap-10 sm:gap-12'>
        <Hello />
        <div className='grid grid-cols-1 mt-10 gap-y-10 sm:gap-y-14 sm:gap-x-10 sm:grid-cols-2'>
          <Contact />
          <WebTech />
          <Tools />
          <OnboardedWebsite />
          <InspirationDesignSources />
        </div>
      </div>
    </Layout>
  );
}
