import Head from 'next/head';
import GlobalNavigation from './GlobalNavigation';
import { useRouter } from 'next/router';
import Footer from './Footer';
import BottomNavMobile from './BottomNavMobile';

interface LayoutType {
  children: React.ReactNode;
  browserTitle: string;
  description: string;
}

export default function Layout({ children, browserTitle, description }: LayoutType) {
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
        <link rel='icon' href='/logo_hariscorp/logo_haritssr.svg' />
        <meta name='theme-color' content='#27272a' />
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

      <main className='mx-auto min-h-screen w-full max-w-4xl px-5 xl:px-0'>{children}</main>

      <Footer />
      <BottomNavMobile />
    </div>
  );
}
