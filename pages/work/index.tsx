import Layout from '@/components/Layout';
import {
  ExternalLink,
  InternalLink,
  NAExternalLink,
  NAInternalLink,
  SubTitle,
  TitleBackHome,
  Topic,
} from '@/components/DesignSystem';

export default function Work() {
  return (
    <Layout browserTitle='My Work' description='My Work'>
      <TitleBackHome name='My Work' />
      <SubTitle>
        All side projects that I have ever done (ready to publish (read:useful)) and arranged by
        group for easy search, on boarded websites is real project. I consider this side project as
        an experiment of some library new features or just curious of some library that i never
        touch. Blue link means available to look, red links means not available or will coming soon.
      </SubTitle>
      <div className='grid grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        <Wrapper topic='Human Interface'>
          <NAInternalLink name='Radix UI' href='/work/radixui' />
          <InternalLink name='Framer Motion' href='/work/framer-motion' />
          <InternalLink name='HeadlessUI' href='/work/headlessui' />
          <InternalLink name='Tailwindcss' href='/work/tailwindcss' />
          <InternalLink name='Button' href='/work/button' />
        </Wrapper>

        <Wrapper topic='Next.js Features'>
          <InternalLink name='Image Components' href='/work/image' />
          <InternalLink name='Dynamic Pages' href='/work/students' />
          <InternalLink name='Internationalization' href='/work/internationalization' />
          <InternalLink name='Avatars' href='/work/avatars' />
          <InternalLink name='100 Articles' href='/work/articles' />
          <NAInternalLink name='Script' href='/work/script' />
        </Wrapper>

        <Wrapper topic='Database'>
          <NAExternalLink name='Firebase' href='https://www.firebase-harislab.vercel.app' />
          <NAExternalLink name='Supabase' href='https://www.supabase-harislab.vercel.app' />
          <NAExternalLink name='Planetscale' href='https://www.planetscale-harislab.vercel.app' />
        </Wrapper>

        <Wrapper topic='Browser API'>
          <InternalLink name='Browser Title' href='/work/browser-title' />
          <InternalLink name='Date' href='/work/date' />
          <NAInternalLink name='Event' href='/work/event' />
          <InternalLink name='Video' href='/work/video' />
          <InternalLink name='Audio' href='/work/audio' />
        </Wrapper>

        <Wrapper topic='Others'>
          <NAExternalLink name='NextAuth' href='https://www.nextauth-harislab.vercel.app' />
          <NAExternalLink name='Notion' href='https://www.notion-harislab.vercel.app' />
          <NAExternalLink name='Cloudinary' href='/work/cloudinary' />
          <NAExternalLink name='SWR' href='/work/swr' />
        </Wrapper>

        <Wrapper topic='Onboarded Website'>
          <ExternalLink name='AKA Trading Indonesia' href='https://www.aka-tradingindo.com' />
          <ExternalLink name='Haris Lab' href='https://www.harislab.com' />
          <ExternalLink name='Haris Studio' href='https://harisstudio.vercel.app' />
          <ExternalLink name='Harits Syah' href='https://haritssr.vercel.app' />
        </Wrapper>

        <Wrapper topic='React JS'>
          <InternalLink name='useState' href='/work/useState' />
          <InternalLink name='useEffect' href='/work/useEffect' />
          <NAInternalLink name='useContext' href='/showcasContextffect' />
          <NAInternalLink name='useRef' href='/work/useRef' />
          <NAInternalLink name='useMemo' href='/work/Memo' />
        </Wrapper>

        <Wrapper topic='Games'>
          <InternalLink name='Number Game' href='/work/number-game' />
        </Wrapper>
      </div>
    </Layout>
  );
}

const Wrapper = ({ children, topic }) => {
  const section = 'flex flex-col space-y-1 justify-center sm:justify-left -mt-1';
  return (
    <div>
      <Topic name={topic} />
      <div className={section}>{children}</div>
    </div>
  );
};
