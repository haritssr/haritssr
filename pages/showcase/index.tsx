import Layout from '@/components/Layout';
import {
  ExternalLink,
  InternalLink,
  NAExternalLink,
  NAInternalLink,
  Title,
  Topic,
} from '@/components/DesignSystem';

export default function Showcase() {
  const section = 'grid grid-cols-1 gap-3 sm:gap-2';
  return (
    <Layout browserTitle='showcase' description='Showcase'>
      <Title name='Showcase' />
      <div className='grid grid-cols-1 gap-10 xs:grid-cols-2 md:grod-cols-3 lg:grid-cols-4 '>
        <div>
          <Topic name='Human Interface' />
          <div className={section}>
            <NAInternalLink name='Radix UI' to='/showcase/radixui' />
            <InternalLink name='Framer Motion' to='/showcase/framer-motion' />
            <InternalLink name='HeadlessUI' to='/showcase/headlessui' />
            <InternalLink name='Tailwindcss' to='/showcase/tailwindcss' />
            <InternalLink name='Button' to='/showcase/button' />
          </div>
        </div>

        <div>
          <Topic name='Next.js Features' />
          <div className={section}>
            <InternalLink name='Image Components' to='/showcase/image' />
            <InternalLink name='Dynamic Pages' to='/showcase/students' />
            <InternalLink name='Internationalization' to='/showcase/internationalization' />
          </div>
        </div>

        <div>
          <Topic name='Database' />
          <div className={section}>
            <NAExternalLink name='Firebase' to='https://www.firebase-harislab.vercel.app' />
            <NAExternalLink name='Supabase' to='https://www.supabase-harislab.vercel.app' />
            <NAExternalLink name='Planetscale' to='https://www.planetscale-harislab.vercel.app' />
          </div>
        </div>

        <div>
          <Topic name='Browser API' />
          <div className={section}>
            <InternalLink name='Browser Title' to='/showcase/browser-title' />
            <InternalLink name='Date' to='/showcase/date' />
            <NAInternalLink name='Event' to='/showcase/event' />
          </div>
        </div>

        <div>
          <Topic name='Others' />
          <div className={section}>
            <NAExternalLink name='NextAuth' to='https://www.nextauth-harislab.vercel.app' />
            <NAExternalLink name='Notion' to='https://www.notion-harislab.vercel.app' />
            <NAExternalLink name='Cloudinary' to='/showcase/cloudinary' />
            <NAExternalLink name='SWR' to='/showcase/swr' />
          </div>
        </div>

        <div>
          <Topic name='Onboarded Websites' />
          <div className={section}>
            <ExternalLink name='AKA Trading Indonesia' to='https://www.aka-tradingindo.com' />
            <ExternalLink name='Haris Laboratory' to='https://www.harislab.com' />
            <ExternalLink name='Haris Studio' to='https://harisstudio.vercel.app' />
            <ExternalLink name='haritssr (Personal Blog)' to='https://haritssr.vercel.app' />
          </div>
        </div>

        <div>
          <Topic name='React Features' />
          <div className={section}>
            <InternalLink name='useState' to='/showcase/useState' />
            <NAInternalLink name='useEffect' to='/showcase/useEffect' />
            <NAInternalLink name='useContext' to='/showcasContextffect' />
            <NAInternalLink name='useRef' to='/showcase/useRef' />
            <NAInternalLink name='useMemo' to='/showcase/Memo' />
          </div>
        </div>

        <div>
          <Topic name='Games' />
          <div className={section}>
            <InternalLink name='Number Game' to='/showcase/number-game' />
          </div>
        </div>
      </div>

      <div className='mt-20 text-gray-700'>
        <div className='flex flex-row items-center'>
          <div className='inline-block w-4 h-4 bg-blue-600 rounded-full'></div>
          <p>&nbsp;: Available now</p>
        </div>
        <div className='flex flex-row items-center'>
          <div className='inline-block w-4 h-4 rounded-full bg-rose-600'></div>
          <p>&nbsp;: Unavailable now</p>
        </div>
      </div>
    </Layout>
  );
}
