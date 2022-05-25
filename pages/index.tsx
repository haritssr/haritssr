import Layout from '@/components/Layout';
import Image from 'next/image';
import ContactComponent from '@/components/ContactComponent';
import { BigInternalLink, InternalLink, Topic } from '@/components/DesignSystem';
import { TechnologyData } from '../data/TechnologyData';

import { ContactData } from '../data/ContactData';
import ProjectsBox from '@/components/ProjectBox';
import { ProjectsData } from '../data/ProjectsData';
import { BooksData } from 'data/BooksData';
import { MainAppsData } from 'data/MainAppsData';

import Link from 'next/link';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <section className='mx-auto mt-10 mb-24 flex flex-col justify-center gap-y-10 rounded-xl sm:mt-20 md:flex-row-reverse md:justify-between md:gap-y-0 md:gap-x-10  xl:px-0'>
        <article className='sm:jusitfy-center flex justify-center object-center sm:flex sm:h-auto sm:items-center'>
          <Image
            src='/me.jpg'
            height='200'
            width='200'
            className='z-10 rounded-full'
            alt='Harits Syah'
            blurDataURL='/me.jpg'
            placeholder='blur'
          />
        </article>
        <article className='space-y-4 text-center sm:my-auto md:text-left'>
          <div className='text-3xl font-bold text-zinc-800 sm:text-5xl'>Harits Syah</div>
          <div className='text-lg font-medium text-zinc-700 sm:text-2xl'>
            Frontend Engineer & Web Designer
          </div>
          <div className='text-lg text-zinc-600 sm:text-xl'>
            Creator of {``}
            <a
              href='www.harislab.com'
              target='_blank'
              rel='noopener norefferer'
              className='hover:text-white-500 hover:underline'
            >
              Haris Lab
            </a>{' '}
            &{' '}
            <a
              href='www.harislab.com'
              target='_blank'
              rel='noopener norefferer'
              className='hover:text-white-500 hover:underline'
            >
              Haris Studio
            </a>
          </div>

          <div className='flex w-full flex-col items-center justify-center space-y-3 p-8 sm:flex-row sm:space-y-0 sm:space-x-5 sm:p-0 md:justify-start'>
            <Link href='/experiments'>
              <a className='text-whitehover:border-blue-600 flex w-full items-center justify-center space-x-2 rounded-md border border-blue-500 bg-blue-500 px-4 py-1.5 text-center text-white hover:bg-blue-600 sm:w-2/5'>
                Experiments
              </a>
            </Link>
            <Link href='/blog'>
              <a className='text-zinc-700hover:bg-zinc-100 flex w-full items-center justify-center space-x-2 rounded-md border border-zinc-400 px-4 py-1.5 text-center text-zinc-700 hover:bg-zinc-50 sm:w-2/5'>
                Blog
              </a>
            </Link>
            {/* <BigInternalLink href='/experiments' name='Experiments' />
            <BigInternalLink href='/blog' name='Blog' /> */}
          </div>
        </article>
      </section>

      <section className='my-28' id='projects'>
        <Topic name='Projects' />
        <div className='mt-3 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-4'>
          {ProjectsData.map(d => (
            <ProjectsBox
              key={d.title}
              href={d.href}
              description={d.description}
              title={d.title}
              period={d.period}
              status={d.status}
              imgSrc={d.imgSrc}
              industry={d.industry}
            />
          ))}
        </div>
      </section>

      <section className='mb-28'>
        <Topic name='Technology' />
        <div className='mt-3 grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5 md:grid-cols-4'>
          {TechnologyData.map(c => (
            <ContactComponent href={c.href} name={c.name} key={c.name} imgSrc={c.imgSrc} />
          ))}
        </div>
      </section>

      <section className='mb-28'> 
        <Topic name='Main Apps' />
        <div className='mt-3 grid grid-flow-row grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5 md:grid-cols-4'>
          {MainAppsData.map(c => (
            <ContactComponent href={c.href} name={c.name} key={c.name} imgSrc={c.imgSrc} />
          ))}
        </div>
      </section>

      <section className='mb-28'>
        <Topic name='Favorite Reading' />
        <div className='mt-3 grid w-fit grid-flow-row grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-5'>
          {BooksData.map(({ title, href, imgSrc }) => (
            <div className='flex h-full flex-col' key={title}>
              <div className='rounded-md  bg-zinc-100 hover:bg-zinc-200'>
                <a
                  title={title}
                  href={href}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='mb-1 inline-block h-full px-3 pt-3'
                >
                  <Image src={imgSrc} alt={title} height={190} width={150} />
                  <div className='pb-1 text-[12px] font-medium text-zinc-700 sm:text-sm'>
                    {title}
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='mb-28 space-y-2'>
        <Topic name="What Do I Mean by Me As A Web 'Frontend Engineer'?" />
        <div>
          Being Web Frontend Engineer means doing data manipulation from many sources staticly or
          dynamicly and display it on web platform in a lot of unique ways by laveraging built-in
          web interface or handmade/library made interface. Also maintaining codebase and doing best
          practice.
        </div>
        <div>
          <div>What I do:</div>
          <ul className='ml-5 list-inside list-disc text-zinc-800'>
            <li>Performance</li>
            <li>Core Web Vitals</li>
            <li>SEO</li>
            <li>Specific JavaScript Framework (Next.js, a.k.a React Framework)</li>
            <li>Data Visualization</li>
            <li>Common Web User Interface Pattern</li>
            <li>Slicing design into static or dynamic frontend</li>
            <li>Testing</li>
          </ul>
        </div>
        <div>
          <InternalLink href='/#projects' name='See my comperhensive frontend projects' />
          <InternalLink href='/experiments' name='See my experimental frontend projects' />
        </div>
      </section>
      <section className='mb-28 space-y-2'>
        <Topic name="What Do I Mean by Me As A 'Web Designer'?" />
        <div>
          Being Web Designer mean using design tools to mapping the web owner or bussiness logic to
          mockup as a way to solve the need of operation of the bussiness or intent.
        </div>
        <div>
          <div>What I do:</div>
          <ul className='ml-5 list-inside list-disc text-zinc-800'>
            <li>Doing interface manipulation on design tools like Figma</li>
            <li>Prototyping</li>
          </ul>
        </div>
        <InternalLink href='/' name='See my design projects' />
      </section>

      <section id='contacts'>
        <Topic name='Contacts' />
        <div className='mt-3 grid grid-flow-row grid-cols-1 gap-2 sm:w-fit sm:gap-x-5'>
          {ContactData.map(c => (
            <ContactComponent href={c.href} name={c.name} key={c.imgSrc} imgSrc={c.imgSrc} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
