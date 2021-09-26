import Layout from '@/components/Layout';
import { ExternalLink, InternalLink, Title, Topic } from '@/components/DesignSystem';

export default function Showcase() {
  const section = 'grid grid-cols-1 gap-3 sm:gap-2';
  return (
    <Layout browserTitle='showcase' description='Showcase'>
      <Title name='Showcase' />
      <div className='grid grid-cols-1 gap-10 xs:grid-cols-2 md:grod-cols-3 lg:grid-cols-4 '>
        <div>
          <Topic name='Human Interface' />
          <div className={section}>
            <InternalLink name='Radix UI' to='/showcase/radixui' />
            <InternalLink name='Framer Motion' to='/showcase/framer-motion' />
            <InternalLink name='HeadlessUI' to='/showcase/headlessui' />
            <InternalLink name='Tailwindcss' to='/showcase/tailwindcss' />
          </div>
        </div>

        <div>
          <Topic name='Next.js Features' />
          <div className={section}>
            <InternalLink name='Dynamic Pages' to='/showcase/students' />
            <InternalLink name='Internationalization' to='/showcase/internationalization' />
          </div>
        </div>

        <div>
          <Topic name='Database' />
          <div className={section}>
            <ExternalLink name='Firebase' to='https://www.firebase-harislab.vercel.app' />
            <ExternalLink name='Supabase' to='https://www.supabase-harislab.vercel.app' />
          </div>
        </div>

        <div>
          <Topic name='Browser API' />
          <div className={section}>
            <InternalLink name='Browser Title' to='/showcase/browser-title' />
            <InternalLink name='Date' to='/showcase/date' />
          </div>
        </div>

        <div>
          <Topic name='Others' />
          <div className={section}>
            <ExternalLink name='NextAuth' to='https://www.nextauth-harislab.vercel.app' />
            <ExternalLink name='Notion' to='https://www.notion-harislab.vercel.app' />
          </div>
        </div>

        <div>
          <Topic name='Onboarded Websites' />
          <div className={section}>
            <ExternalLink name='AKA Trading Indonesia' to='https://www.aka-tradingindo.com' />
            <ExternalLink name='Haris Laboratory' to='https://www.harislab.com' />
          </div>
        </div>

        <div>
          <Topic name='React Features' />
          <div className={section}>
            <InternalLink name='useState' to='/showcase/usestate' />
          </div>
        </div>

        <div>
          <Topic name='Games' />
          <div className={section}>
            <InternalLink name='Number Game' to='/showcase/number-game' />
          </div>
        </div>
      </div>
    </Layout>
  );
}
