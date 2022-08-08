import Layout from '@/components/Layout';
import Image from 'next/image';
import ContactComponent from '@/components/ContactComponent';
import { InternalLink } from '@/components/DesignSystem';
import { TechnologyData } from '../data/TechnologyData';
import { ContactData } from '../data/ContactData';
import ProjectsBox from '@/components/ProjectBox';
import { ProjectsData } from '../data/ProjectsData';
import { DesignProjectsData } from '../data/DesignProjectsData';
import { BooksData } from 'data/BooksData';
import { MainAppsData } from 'data/MainAppsData';
import { LogoHarisLab } from '@/components/Icons';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-0  sm:border-b sm:border-zinc-200'>
        <section className='mx-auto mt-10 mb-24 flex flex-col sm:mx-0 sm:mr-10 sm:mb-10 sm:mt-20 sm:px-0 '>
          <article className=' mb-5 flex justify-center object-center sm:flex sm:h-auto sm:items-center sm:justify-start'>
            <Image
              src='/me.jpg'
              height='180'
              width='180'
              className='z-10 rounded-full'
              alt='Harits Syah'
              blurDataURL='/me.jpg'
              placeholder='blur'
            />
          </article>
          <article className='space-y-3 text-center sm:my-auto sm:text-left'>
            <div className='text-3xl font-bold text-zinc-800'>Harits Syah R</div>
            <div className='text-lg font-medium text-zinc-700'>Web Frontend React Engineer</div>
            <div className='flex sm:justify-start'>
              <a
                href='https://www.harislab.com'
                title='https://www.harislab.com'
                target='_blank'
                rel='noreferrer noopener'
                className='mx-auto flex w-fit cursor-pointer  items-center space-x-1.5 rounded-md  bg-zinc-50 px-3 py-1 hover:bg-zinc-100 sm:mx-0'
              >
                <LogoHarisLab />
                <div className='text-lg font-medium text-zinc-800'>Haris Lab</div>
              </a>
            </div>
          </article>
        </section>
        <section id='contacts' className='top-24 px-5 sm:top-0 sm:mt-[82px] sm:px-0 sm:pl-10'>
          <Topic name='Contacts' />
          <div className='grid grid-flow-row grid-cols-1 gap-4 sm:w-fit'>
            {ContactData.map(c => (
              <ContactComponent
                href={c.href}
                name={c.name}
                key={c.imgSrc}
                imgSrc={c.imgSrc}
                title={c.title}
              />
            ))}
          </div>
        </section>
      </div>

      <section className='mt-16 mb-28 px-5 sm:px-0' id='projects'>
        <Topic name='Frontend Projects' />
        <div className='mt-5 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4'>
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

      <section className='my-28 px-5 sm:px-0' id='projects'>
        <Topic name='Design Projects' />
        <div className='mt-5 grid grid-cols-1 gap-8 sm:grid-cols-4 sm:gap-5 lg:grid-cols-4'>
          {DesignProjectsData.map(d => (
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

      <section className='my-28 px-5 sm:px-0'>
        <Topic name='Technologies' />
        <div className='grid grid-flow-row grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4'>
          {TechnologyData.map(c => (
            <ContactComponent
              href={c.href}
              name={c.name}
              key={c.name}
              imgSrc={c.imgSrc}
              title={c.href}
            />
          ))}
        </div>
      </section>

      <section className='mb-28 px-5 sm:px-0'>
        <Topic name='Main Apps' />
        <div className='grid grid-flow-row grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4'>
          {MainAppsData.map(c => (
            <ContactComponent
              href={c.href}
              name={c.name}
              key={c.name}
              imgSrc={c.imgSrc}
              title={c.href}
            />
          ))}
        </div>
      </section>

      <section className='mb-28 px-5 sm:px-0'>
        <Topic name='Favorite Reading' />
        <div className='grid w-fit grid-flow-row grid-cols-2 gap-3 rounded-md bg-gray-50 p-4 sm:grid-cols-3 sm:gap-5 sm:gap-x-5 md:grid-cols-5'>
          {BooksData.map(({ title, href, imgSrc }) => (
            <div className='flex h-full flex-col' key={title}>
              <div className='rounded-md '>
                <a
                  title={title}
                  href={href}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='mb-1 inline-block h-full px-3 pt-3'
                >
                  <Image src={imgSrc} alt={title} height={190} width={150} />
                  <div className='pb-1 text-[12px] text-zinc-700 sm:text-sm'>{title}</div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <section className='mb-28 space-y-2 px-5 text-zinc-600 sm:px-0'>
        <Topic name='What do i mean me as a Web Frontend Engineer?' />
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
        <div className='pt-2'>
          <InternalLink href='/#projects' name='See Frontend projects' />
        </div>
      </section>

      <section className='mb-28 space-y-2 px-5 text-zinc-600 sm:px-0 '>
        <Topic name='What do i mean me as a Web Designer?' />
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
        <div className='pt-2'>
          <InternalLink href='/' name='See Design projects' />
        </div>
      </section> */}

      <section className='mb-28 px-5 sm:px-0'>
        <Topic name='Experiments' />
        <div className='grid grid-flow-row grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4'>
          <InternalLink name='See all experiments' href='/experiments' />
        </div>
      </section>

      <section className='mb-28 px-5 sm:px-0'>
        <Topic name='Blog' />
        <div className='grid grid-flow-row grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4'>
          <InternalLink name='See all blogs' href='/blog' />
        </div>
      </section>
    </Layout>
  );
}

const Topic = ({ name }: { name: string }) => {
  return <h2 className='mb-2 text-2xl font-semibold text-zinc-700'>{name}</h2>;
};
