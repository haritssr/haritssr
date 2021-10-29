import Layout from '@/components/Layout';
import {
  ExternalLink,
  InternalLink,
  NAExternalLink,
  NAInternalLink,
  SubTitle,
  TitleBackHome,
} from '@/components/DesignSystem';
import WorkWrapper from '@/components/WorkWrapper';

export default function Work() {
  return (
    <Layout browserTitle='My Work' description='My Work'>
      <TitleBackHome title='My Work' />
      <SubTitle>
        All side projects that I have ever done (ready to publish (read:useful)) and arranged by
        group for easy search, on boarded websites is real project. I consider this side project as
        an experiment. Blue link = available, red links = not available || will coming soon.
      </SubTitle>
      <div className='grid grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        <WorkWrapper topic='Human Interface'>
          <InternalLink name='Framer Motion' href='/work/framer-motion' />
          <InternalLink name='Framer Motion 5' href='/work/framer-motion-5' />
          <InternalLink name='HeadlessUI' href='/work/headlessui' />
          <InternalLink name='Tailwindcss' href='/work/tailwindcss' />
          <InternalLink name='Button' href='/work/button' />
          <NAInternalLink name='Radix UI' href='/work/radixui' />
        </WorkWrapper>

        <WorkWrapper topic='Next.js'>
          <InternalLink name='Image Components' href='/work/image' />
          <InternalLink name='Dynamic Pages' href='/work/students' />
          <InternalLink name='Internationalization' href='/work/internationalization' />
          <InternalLink name='Avatars' href='/work/avatars' />
          <InternalLink name='100 Articles' href='/work/articles' />
          <NAInternalLink name='Script' href='/work/script' />
        </WorkWrapper>

        <WorkWrapper topic='Database'>
          <NAExternalLink name='Firebase' href='https://www.firebase-harislab.vercel.app' />
          <NAExternalLink name='Supabase' href='https://www.supabase-harislab.vercel.app' />
          <NAExternalLink name='Planetscale' href='https://www.planetscale-harislab.vercel.app' />
        </WorkWrapper>

        <WorkWrapper topic='Browser API'>
          <InternalLink name='Browser Title' href='/work/browser-title' />
          <InternalLink name='Date' href='/work/date' />
          <InternalLink name='Video' href='/work/video' />
          <InternalLink name='Audio' href='/work/audio' />
          <NAInternalLink name='Event' href='/work/event' />
        </WorkWrapper>

        <WorkWrapper topic='Onboarded Website'>
          <ExternalLink name='AKA Trading Indonesia' href='https://www.aka-tradingindo.com' />
          <ExternalLink name='Haris Lab' href='https://www.harislab.com' />
          <ExternalLink name='Haris Studio' href='https://harisstudio.vercel.app' />
          <ExternalLink name='Harits Syah' href='https://haritssr.vercel.app' />
        </WorkWrapper>

        <WorkWrapper topic='React.js'>
          <InternalLink name='useState' href='/work/useState' />
          <InternalLink name='useEffect' href='/work/useEffect' />
          <NAInternalLink name='useContext' href='/showcasContextffect' />
          <NAInternalLink name='useRef' href='/work/useRef' />
          <NAInternalLink name='useMemo' href='/work/Memo' />
        </WorkWrapper>

        <WorkWrapper topic='Games'>
          <InternalLink name='Number Game' href='/work/number-game' />
        </WorkWrapper>

        <WorkWrapper topic='Others'>
          <NAExternalLink name='NextAuth' href='https://www.nextauth-harislab.vercel.app' />
          <NAExternalLink name='Notion' href='https://www.notion-harislab.vercel.app' />
          <NAExternalLink name='Cloudinary' href='/work/cloudinary' />
          <NAExternalLink name='SWR' href='/work/swr' />
        </WorkWrapper>
      </div>
    </Layout>
  );
}
