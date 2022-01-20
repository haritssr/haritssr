import Head from 'next/head';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import { useRouter } from 'next/router';
import Footer from './Footer';

export default function Layout({
  children,
  browserTitle,
  description,
}: {
  children: React.ReactNode;
  browserTitle: string;
  description: string;
}) {
  const router = useRouter();
  const image = 'https://harislab.com/public/HarisLab.png';
  const type = 'website';
  // bg-[#f2f1f7]
  return (
    <div className='bg-white'>
      <Head>
        {router.asPath === '/' ? (
          <title>Harits Syah - Front End Engineer & Web Designer</title>
        ) : (
          <title>{browserTitle} - Harits Syah</title>
        )}{' '}
        <link rel='icon' href='/harislab_ico.ico' />
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

      <section className='sticky top-0 z-50 '>
        <NavDesktop />
        <NavMobile />
      </section>

      <main className='w-full max-w-4xl min-h-screen px-8 pb-5 mx-auto sm:pb-0 xl:px-0 font-inter'>
        {children}
      </main>

      <Footer />
    </div>
  );
}
