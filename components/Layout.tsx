import Head from 'next/head';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Layout({ children, browserTitle, description }) {
  const router = useRouter();
  const image = 'https://harislab.com/public/HarisLab.png';
  const type = 'website';
  return (
    <div className='bg-[#F5F5F7]'>
      <Head>
        {router.asPath === '/' ? (
          <title>Harits Syah - Web Developer & Designer</title>
        ) : (
          <title>{browserTitle} - Harits Syah</title>
        )}{' '}
        <link rel='icon' href='/harislab_ico.ico' />
        <meta name='robots' content='follow, index' />
        <meta content={description} name='description' />
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

      <main className='w-full max-w-5xl min-h-screen px-5 pb-5 mx-auto sm:pb-0 xl:px-0 font-inter'>
        {children}
      </main>

      <footer className='max-w-5xl px-5 pt-10 pb-5 mx-auto mt-20 text-center xl:px-0'>
        <Link href='/'>
          <a className='text-gray-700 duration-200 hover:text-amber-500 '>
            Harits Syah &copy; {new Date().getFullYear()}
          </a>
        </Link>
      </footer>
    </div>
  );
}
