import Head from 'next/head';
import GlobalHead from './GlobalHead';
import Footer from './Footer';
import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GitHubIcon } from './Icons';
import { useInView } from 'react-intersection-observer';

interface LayoutToExperimentsType {
  children: React.ReactNode;
  title: string;
  domain: string;
}

export default function LayoutToExperiments({ children, title, domain }: LayoutToExperimentsType) {
  const lastThreeSegmentRoute = useRouter().asPath;
  const githubRoute = `https://github.com/haritssr/haritssr/blob/main/pages${lastThreeSegmentRoute}.tsx`;
  const image = '/images/hero.jpg';
  const yes = `${title} - Harits Syah`;
  const router = useRouter();
  const { ref, inView } = useInView({ rootMargin: '-90px' });

  return (
    <div className='bg-white'>
      <Head>
        <title>{yes}</title>
        <link rel='icon' href='/icons/haritssr.svg' />
        <meta name='theme-color' content='#27272a' />
        <meta name='robots' content='follow, index' />
        <meta name='description' content={title} />
        <meta property='og:type' content='website' />
        <meta property='og:site_name' content='HarisLab' />
        <meta property='og:description' content={title} />
        <meta property='og:title' content={title} />
        <meta property='og:image' content={image} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@haritssr' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={title} />
        <meta name='twitter:image' content={image} />
      </Head>

      <GlobalHead />

      <div
        className={`${
          router.asPath === '/' ? '' : 'sticky top-0 sm:top-0'
        } z-40 mb-5 w-full border-b  border-zinc-200 bg-white/80 py-2 saturate-150 backdrop-blur`}
      >
        <section className='mx-auto flex max-w-4xl items-center justify-between px-3 lg:px-0'>
          <BackToExperiments domain={domain} />
          <PageTitle inView={inView} title={title} />
          <PageSource href={githubRoute} />
        </section>
      </div>
      <main className='mx-auto min-h-screen w-full max-w-4xl px-5 lg:px-0'>
        <h1
          className='z-40 mx-auto mt-12 mb-2 block h-auto w-full break-words text-left text-3xl font-bold text-zinc-800'
          ref={ref}
        >
          {title}
        </h1>
        {children}
      </main>

      <Footer />
    </div>
  );
}
const BackToExperiments = ({ domain }: { domain: string }) => {
  return (
    <Link href={`/experiments/${domain.toLowerCase().replace(/\s/g, '-')}`}>
      <a className='-ml-1 flex w-1/4 cursor-pointer items-center sm:w-1/6'>
        <span className=' inline-block w-full'>
          <span className='group flex items-center'>
            <ChevronLeftIcon
              className='-ml-0.5 h-6 w-6 text-blue-600 sm:group-hover:text-purple-800'
              strokeWidth={2}
            />
            <div className='-ml-1 truncate text-blue-600 sm:group-hover:text-purple-800 '>
              {domain}
            </div>
          </span>
        </span>
      </a>
    </Link>
  );
};

const PageTitle = ({ title, inView }: { title: string; inView: any }) => {
  return (
    <div className='sm:2/4  -mr-2 inline w-1/2'>
      <div className='flex justify-center py-0.5 sm:py-0'>
        <div
          className={`truncate text-center text-lg font-semibold duration-100  ${
            inView ? 'text-transparent' : 'text-zinc-800'
          }`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

const PageSource = ({ href }: { href: string }) => {
  return (
    <div className='flex w-1/4  justify-end sm:w-1/6 '>
      <cite className='not-italic'>
        <a
          title='This page source code'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='flex w-fit cursor-pointer items-center text-blue-600 hover:text-purple-800'
        >
          <span className='mr-2 hidden sm:inline-block'>Source</span>{' '}
          <GitHubIcon className='h-5 w-5 cursor-pointer  ' />
        </a>
      </cite>
    </div>
  );
};
