import Head from 'next/head';
import GlobalHead from './GlobalHead';
import Footer from './Footer';
import React from 'react';
import GlobalNavigationMobile from './GlobalNavigationMobile';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LayoutToExperimentsType {
  children: React.ReactNode;
  title: string;
  domain: string;
}

export default function LayoutToExperiments({ children, title, domain }: LayoutToExperimentsType) {
  const lastThreeSegmentRoute = useRouter().asPath;
  const githubRoute = `https://github.com/haritssr/haritssr/blob/main/pages${lastThreeSegmentRoute}.tsx`;
  // const lastThreeSegmentRoute = useRouter().asPath.split('/').slice(-3).join('/');
  // const githubRoute = `https://github.com/haritssr/haritssr/blob/main/pages/${lastThreeSegmentRoute}.tsx`;

  const image = 'https://harislab.com/public/HarisLab.png';
  //bg-[#f2f1f7]

  const yes = `${title} - Harits Syah`;
  return (
    <div className='bg-white'>
      <Head>
        <title>{yes}</title>
        <link rel='icon' href='/logo_hariscorp/logo_haritssr.svg' />
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

      <div className='sticky top-[48px] z-40 mb-5 w-full border-b  border-zinc-300 bg-gray-100/80 py-1.5 saturate-150 backdrop-blur'>
        <section className='mx-auto flex max-w-4xl items-center justify-between px-3 lg:px-0'>
          <Link href={`/experiments/${domain.toLowerCase().replace(/\s/g, '-')}`}>
            <a className='-ml-2 flex w-1/4 cursor-pointer items-center sm:-ml-0 sm:w-1/6'>
              <span className=' inline-block w-full'>
                <span className='group flex items-center'>
                  <ChevronLeftIcon
                    className='-ml-0.5 h-6 w-6 text-blue-600 hover:no-underline sm:hover:underline sm:group-hover:text-blue-700'
                    strokeWidth={2}
                  />
                  <div className='-ml-1 text-blue-600 hover:no-underline sm:hover:underline sm:group-hover:text-blue-700'>
                    {domain}
                  </div>
                </span>
              </span>
            </a>
          </Link>
          <div className='-mr-2 inline w-3/4 sm:-mr-0 sm:w-2/3'>
            <div className='flex flex-col items-center justify-center -space-y-1 py-0.5 sm:flex-row sm:-space-y-0 sm:space-x-2 sm:py-0'>
              <div className=' text-lg font-semibold text-zinc-800'>{title}</div>
            </div>
          </div>
          <div className='flex w-1/4 justify-end sm:w-1/6 '>
            <Source href={githubRoute} name='Source' />
          </div>
        </section>
      </div>
      <main className='mx-auto min-h-screen w-full max-w-4xl px-5 xl:px-0'>
        <h1 className='z-40 mx-auto mt-6 mb-2 block h-auto w-full text-left text-3xl font-bold text-zinc-800'>
          {title}
        </h1>
        {children}
      </main>

      <Footer />
      <GlobalNavigationMobile />
    </div>
  );
}

const Source = ({ href, name }: { href: string; name: string }) => {
  return (
    <cite className='not-italic'>
      <a
        title='This page source code'
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='group inline-block w-fit cursor-pointer items-center text-blue-600 hover:underline active:text-blue-600'
      >
        {name}
      </a>
    </cite>
  );
};
