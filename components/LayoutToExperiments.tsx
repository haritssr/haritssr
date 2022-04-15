import Head from 'next/head';
import GlobalNavigation from './GlobalNavigation';
import Footer from './Footer';
import React from 'react';
import { LeftArrow } from './Icons';
import { useRouter } from 'next/router';
import BottomNavMobile from './BottomNavMobile';

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
        <title>{title} - Harits Syah</title>
        <link rel='icon' href='/logo_haritssr.svg' />
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

      <div className='sticky top-0 z-40 mb-5 w-full border-b  border-zinc-300 bg-white/80 py-1 backdrop-blur sm:py-2'>
        <section className='mx-auto flex max-w-4xl items-center justify-between px-3 lg:px-0'>
          <button onClick={() => window.history.back()} className='flex w-1/3 items-center '>
            <a className=' inline-block w-full'>
              <div className='group flex items-center'>
                <LeftArrow />
                <div className='-ml-1 text-blue-600 group-hover:text-purple-700'>Back</div>
              </div>
            </a>
          </button>
          <div className='inline w-1/3 '>
            <div className='flex flex-col-reverse items-center justify-center sm:flex-row sm:space-x-2'>
              <div className='-mt-0.5 text-[10px] text-zinc-500 sm:-mt-0 sm:text-base'>
                {domain}
              </div>
              <div className='hidden text-zinc-600 sm:block'>/</div>
              <div className='text-[12px]  font-semibold text-zinc-700 sm:text-base'>{title}</div>
            </div>
          </div>
          <div className='flex w-1/3 justify-end '>
            <div></div>
            {/* <DropdownMenu.Root>
              <DropdownMenu.Trigger className='cursor-pointer  text-blue-500 hover:text-blue-800 hover:outline-none '>
                Daftar isi
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className='mt-2 rounded-xl border bg-white p-3 shadow-md backdrop-blur'>
                <ol className='space-y-1 hover:outline-none'>
                  {ExperimentsData[0].links.map(link => (
                    <DropdownMenu.Item key={link.name}>
                      <li className=' text-zinc-600'>
                        <InternalLink
                          href={`/experiments/${title.toLowerCase().replace(' ', '-')}/${link.name
                            .toLowerCase()
                            .replace(/\s/g, '-')}`}
                          name={link.name}
                        />
                      </li>
                    </DropdownMenu.Item>
                  ))}
                </ol>
              </DropdownMenu.Content>
            </DropdownMenu.Root> */}
          </div>
        </section>
      </div>

      <main className='mx-auto min-h-screen w-full max-w-4xl px-5 xl:px-0'>
        <div className='mt-6 mb-1'>
          {/* Title of the page */}
          <h1 className='z-40 mx-auto block h-auto w-full text-left text-xl font-bold text-zinc-700 sm:text-3xl'>
            {title}
          </h1>
        </div>
        {/* The content */}
        {children}
      </main>

      <Footer />
      <BottomNavMobile />
    </div>
  );
}
