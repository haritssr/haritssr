import Head from 'next/head';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
import { TitleBackToTopic } from './DesignSystem';
import Footer from './Footer';

//from one level below the /work/ to their own topic
//e.g /work/framer-motion/api -> /work/framer-motion
//href is the actual route you want to go (Topic below /work)
//title is
//hrefName is the name of that route
//this components used in /work/[Topic]/[use here]
export default function LayoutSubWorkToTopic({ children, title, href, hrefName }) {
  const image = 'https://harislab.com/public/HarisLab.png';
  //bg-[#f2f1f7]
  return (
    <div className='bg-white'>
      <Head>
        <title>{title} - Harits Syah</title>
        {/* {router.asPath === '/' ? (
          <title>Harits Syah - Web Developer & Designer</title>
        ) : (
          <title>{title} - Harits Syah</title>
        )}{' '} */}
        <link rel='icon' href='/haritssr-rounded.ico' />
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

      <section className='sticky top-0 z-50 '>
        <NavDesktop />
        <NavMobile />
      </section>

      <main className='w-full max-w-4xl min-h-screen px-8 pb-5 mx-auto sm:pb-0 xl:px-0 font-inter'>
        <TitleBackToTopic title={title} href={href} hrefName={hrefName} />
        {children}
      </main>

      <Footer />
    </div>
  );
}
