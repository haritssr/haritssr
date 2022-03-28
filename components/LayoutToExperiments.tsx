import Head from 'next/head';
import GlobalNavigation from './GlobalNavigation';
import Footer from './Footer';
import React from 'react';
import { LeftArrow } from './Icons';
import { useRouter } from 'next/router';

export default function LayoutToExperiments({
  children,
  title,
  domain,
}: {
  children: React.ReactNode;
  title: string;
  domain: string;
}) {
  const image = 'https://harislab.com/public/HarisLab.png';
  //bg-[#f2f1f7]
  const router = useRouter();
  return (
    <div className='bg-white'>
      <Head>
        <title>{title} @ haritssr.com</title>
        <link rel='icon' href='/logo_hariscorp/logo_haritssr.svg' />
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

      <GlobalNavigation />

      <main className='mx-auto min-h-screen w-full max-w-4xl px-8 pb-5 sm:pb-0 xl:px-0'>
        <div className='mt-6 mb-1'>
          {/* Back button */}
          <button onClick={() => window.history.back()}>
            <a className='mb-6 -ml-5 inline-block'>
              <div className='group flex flex-row items-center justify-center'>
                <LeftArrow />
                <div className='text-blue-500 hover:underline group-hover:text-blue-600'>Back</div>
              </div>
            </a>
          </button>
          {/* domain + title */}
          <section className='space-y-2'>
            {/* Domain name under /experiments */}
            <p className=' mb-2 inline rounded-full border bg-zinc-100 py-0.5 px-2 text-tiny text-zinc-600'>
              {domain}
            </p>
            {/* Title of the page */}
            <h1 className='z-40 mx-auto block h-auto w-full text-left text-3xl font-bold text-zinc-700'>
              {title}
            </h1>
          </section>
        </div>
        {/* The content */}
        {children}
      </main>

      <Footer />
    </div>
  );
}
