import Head from 'next/head';
import GlobalHead from './GlobalHead';
import Footer from './Footer';
import React from 'react';
import GlobalNavigationMobile from './GlobalNavigationMobile';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GitHubIcon } from './Icons';

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

      <div className='sticky top-[48px] z-40 mb-5 w-full border-b  border-zinc-300 bg-gray-100/80  py-1.5 saturate-150 backdrop-blur'>
        <section className='mx-auto flex max-w-4xl items-center justify-between px-3 lg:px-0'>
          <BackToExperiments />
          <PageTitle domain={domain} />
          <PageSource href={githubRoute} />
        </section>
      </div>

      <main className='mx-auto min-h-screen w-full max-w-4xl px-5 lg:px-0'>{children}</main>

      <Footer />
      <GlobalNavigationMobile />
    </div>
  );
}
const BackToExperiments = () => {
  return (
    <Link href='/#Experiments'>
      <a className='-ml-2 flex w-1/4 cursor-pointer items-center sm:-ml-0 sm:w-1/6'>
        <span className=' inline-block w-full'>
          <span className='group flex items-center'>
            <ChevronLeftIcon
              className='-ml-0.5 h-6 w-6 text-blue-600 hover:no-underline sm:hover:underline sm:group-hover:text-blue-700'
              strokeWidth={2}
            />
            <div className='-ml-1 truncate text-blue-600 hover:no-underline sm:hover:underline sm:group-hover:text-blue-700'>
              Experiments
            </div>
          </span>
        </span>
      </a>
    </Link>
  );
};

const PageTitle = ({ domain }: { domain: string }) => {
  return (
    <div className=' inline w-3/4 sm:w-2/3'>
      <div className='flex flex-col items-center justify-center -space-y-1 py-0.5 sm:flex-row sm:-space-y-0 sm:space-x-2 sm:py-0'>
        <div className=' -ml-1 text-lg font-semibold text-zinc-800 sm:-mr-3'>{domain}</div>
      </div>
    </div>
  );
};

const PageSource = ({ href }: { href: string }) => {
  return (
    <div className='flex w-1/4 justify-end sm:w-1/6 '>
      <cite className='not-italic'>
        <a
          title='This page source code'
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='group flex w-fit cursor-pointer items-center text-blue-600 hover:underline active:text-blue-600'
        >
          <GitHubIcon className='h-5 w-5 cursor-pointer text-blue-600 hover:text-blue-700' />
        </a>
      </cite>
    </div>
  );
};
