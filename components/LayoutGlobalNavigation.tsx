import Head from 'next/head';
import GlobalNavigation from './GlobalNavigation';
import { useRouter } from 'next/router';
import Footer from './Footer';
import BottomNavMobile from './BottomNavMobile';

interface LayoutType {
  children: React.ReactNode;
  browserTitle: string;
  description: string;
  domain: string;
}

export default function LayoutGlobalNavigation({
  children,
  browserTitle,
  description,
  domain,
}: LayoutType) {
  const router = useRouter();
  const image = 'https://harislab.com/public/HarisLab.png';
  const type = 'website';
  // bg-[#f2f1f7]
  return (
    <div className='bg-white'>
      <Head>
        {router.asPath === '/' ? (
          <title>Harits Syah</title>
        ) : (
          <title>{browserTitle} - Harits Syah</title>
        )}{' '}
        <link rel='icon' href='/logo_haritssr.svg' />
        <meta name='robots' content='follow, index' />
        <meta name='description' content={description} />
        <meta property='og:type' content={type} />
        <meta property='og:site_name' content='HarisLab' />
        <meta property='og:description' content={description} />
        <meta property='og:title' content={browserTitle} />
        <meta property='og:image' content={image} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@haritssr' />
        <meta name='twitter:title' content={browserTitle} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
      </Head>

      <GlobalNavigation />

      <div className='sticky inset-x-0 top-0 z-40 w-full border-b border-zinc-300  bg-white/80 py-1.5 backdrop-blur mb-10'>
        <section className='mx-auto flex max-w-4xl items-center justify-between px-3 lg:px-0'>
          <h2 id='work' className='z-40 flex h-auto items-center'>
            <div className='text-xl font-bold text-gray-700 '>{domain}</div>
          </h2>
        </section>
      </div>

      <main className='mx-auto min-h-screen w-full max-w-4xl px-8 pb-5 sm:pb-0 xl:px-0'>
        {children}
      </main>

      <Footer />
      <BottomNavMobile />
    </div>
  );
}
