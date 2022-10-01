import Head from 'next/head';
import GlobalHead from './GlobalHead';
import Footer from './Footer';
import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GitHubIcon } from './Icons';
import { useInView } from 'react-intersection-observer';

// This layout used for every pages under the Experiments and Blog

interface LayoutNodeExperimentsType {
  children: React.ReactNode;
  title: string;
  domain: string;
}

export default function LayoutNodeExperiments({
  children,
  title,
  domain,
}: LayoutNodeExperimentsType) {
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
          router.asPath === '/' ? '' : 'sticky top-0 sm:top-[45px]'
        } z-40 mb-5 w-full border-b border-zinc-200 bg-white/80 py-2 saturate-150 backdrop-blur`}
      >
        <section className='mx-auto flex max-w-4xl items-center justify-between px-3 lg:px-0'>
          <BackToExperiments />
          <PageTitle inView={inView} domain={domain} />
          <PageSource href={githubRoute} />
        </section>
      </div>

      <main className='mx-auto min-h-screen w-full max-w-4xl px-5 lg:px-0'>{children}</main>

      <Footer />
    </div>
  );
}
const BackToExperiments = () => {
  return (
    <Link href='/#experiments'>
      <a className='-ml-1 flex w-1/3 cursor-pointer items-center sm:w-1/3'>
        <span className=' inline-block w-full'>
          <span className='group flex items-center'>
            <ChevronLeftIcon
              className='-ml-0.5 h-6 w-6 text-blue-600 sm:group-hover:text-purple-800'
              strokeWidth={2}
            />
            <div className='-ml-1 text-blue-600 sm:group-hover:text-purple-800'>Experiments</div>
          </span>
        </span>
      </a>
    </Link>
  );
};

const PageTitle = ({ domain, inView }: { domain: string; inView: any }) => {
  return (
    <div className=' inline w-1/3 sm:w-1/3'>
      <div className='flex flex-col items-center justify-center -space-y-1 py-0.5 sm:flex-row sm:-space-y-0 sm:space-x-2 sm:py-0'>
        <div
          className={`-ml-1 truncate text-lg font-semibold text-zinc-800 sm:-mr-3${
            inView ? 'text-transparent' : 'text-zinc-800'
          }`}
        >
          {domain}
        </div>
      </div>
    </div>
  );
};

const PageSource = ({ href }: { href: string }) => {
  return (
    <div className='flex w-1/3 justify-end sm:w-1/3 '>
      <cite className='not-italic'>
        <a
          title='This page source code'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='flex w-fit cursor-pointer items-center text-blue-600  hover:text-purple-800'
        >
          <span className='mr-2 hidden sm:inline-block'>Source</span>{' '}
          <GitHubIcon className='h-5 w-5 cursor-pointer ' />
        </a>
      </cite>
    </div>
  );
};
