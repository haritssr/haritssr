import Layout from '@/components/Layout';
import Image from 'next/image';
import ContactComponent from '@/components/ContactComponent';
import { ExternalLink } from '@/components/DesignSystem';
import {
  Backend,
  DataVisulization,
  Hosting,
  MainTools,
  CodeManagement,
  ComponentLibrary,
  ProgrammingLanguage,
  Styling,
  Animation,
  FrontendFramework,
  Documentation,
  Testing,
} from '../data/TechnologyData';
import { ContactData } from '../data/ContactData';
import ProjectsBox from '@/components/ProjectBox';
import { ProjectsData } from '../data/ProjectsData';
import { MathPhysicsBooks, TechicalBooksData, UIUXBooksData } from 'data/BooksData';
import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { TechStackComponent } from '@/components/TechStackComponents';
import ExperimentsIndexBox from '@/components/ExperimentsIndexBox';
import { ExperimentIndexData } from 'data/ExperimentsIndexData';
import DialogButton from '@/components/DialogButton';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <div className='mt-5 space-y-28 sm:mt-10 sm:space-y-32'>
        <Contacts />
        <Projects />
        <Experiments />
        <Blog />
        <TechStack />
        <Reading />
      </div>
    </Layout>
  );
}

const Wrapper = ({
  topic,
  subtitle,
  className,
  children,
  id,
}: {
  topic: string;
  subtitle: string;
  className?: string;
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div id={id}>
      <div className='mb-6 space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='text-2xl font-semibold text-zinc-800 sm:text-3xl'>{topic} </div>
          {/* <div className='cursor-pointer text-xl font-medium text-blue-600 hover:underline'>
            See All
          </div> */}
        </div>
        <div className='text-2xl font-medium text-zinc-400 sm:text-3xl '>{subtitle}</div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div
      id='contacts'
      className='grid grid-cols-1 gap-10 rounded-lg border border-zinc-300 bg-gradient-to-t from-zinc-100 via-white to-white px-5 py-10 shadow sm:grid-cols-2 sm:gap-0 sm:bg-gradient-to-bl sm:via-zinc-50 sm:p-10'
    >
      <section className='mx-auto flex flex-col sm:mx-0 sm:mr-10  sm:px-0 sm:pl-4'>
        <article className=' mb-5 flex justify-center object-center sm:flex sm:h-auto sm:items-center sm:justify-start'>
          <Image
            src='/images/me.jpg'
            height='180'
            width='180'
            className='z-10 rounded-full'
            alt='Harits Syah'
            blurDataURL='/images/me.jpg'
            placeholder='blur'
          />
        </article>
        <article className='space-y-2 text-center sm:text-left'>
          <div className='text-2xl font-bold text-zinc-800'>Harits Syah</div>
          <div className='flex items-center space-x-1 text-lg text-zinc-500'>
            <div className='div'>South Tangerang City, Indonesia</div>{' '}
            <a
              href='https://goo.gl/maps/zNCvRABE5bfJHPcbA'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LocationMarkerIcon className='h-4 w-4 text-rose-500 hover:text-rose-600 hover:ring-1 hover:ring-rose-300 sm:h-5 sm:w-5' />
            </a>
          </div>
          <div className='text-lg text-zinc-500'>Web Frontend React Engineer</div>
          <div className='flex justify-center sm:justify-start'>
            <ExternalLink big={true} name='Haris Lab' href='https://www.harislab.com' />
          </div>
        </article>
      </section>
      <section className='px-5 sm:flex sm:justify-end sm:px-0'>
        <div className='grid  grid-cols-1 gap-4'>
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
  );
};

const Projects = () => {
  return (
    <Wrapper
      id='projects'
      topic='Projects'
      subtitle='Hosted frontend projects.'
      className='grid grid-cols-1 gap-8 px-10 sm:grid-cols-3 sm:gap-5 sm:px-0 lg:grid-cols-4'
    >
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
    </Wrapper>
  );
};

const TechStack = () => {
  return (
    <Wrapper
      id='techstack'
      topic='Tech Stack'
      subtitle='Technology I have used.'
      className='grid grid-flow-row grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4'
    >
      <TechStackComponent data={Backend} title='Backend' />
      <TechStackComponent data={DataVisulization} title='Data Visualization' />
      <TechStackComponent data={Animation} title='Animation' />
      <TechStackComponent data={Hosting} title='Hosting' />
      <TechStackComponent data={ProgrammingLanguage} title='Programming Language' />
      <TechStackComponent data={FrontendFramework} title='Frontend Framework' />
      <TechStackComponent data={Documentation} title='Documentation' />
      <TechStackComponent data={Testing} title='Testing' />
      <TechStackComponent data={ComponentLibrary} title='Component Library' />
      <TechStackComponent data={CodeManagement} title='Code Management' />
      <TechStackComponent data={MainTools} title='Main Tools' />
      <TechStackComponent data={Styling} title='Styling' />
    </Wrapper>
  );
};

const Experiments = () => {
  return (
    <Wrapper
      id='experiments'
      topic='Experiments'
      subtitle='My tech stack exploration'
      className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 '
    >
      {ExperimentIndexData.map(({ title, href, imgSrc, sum, type, ver }) => (
        <ExperimentsIndexBox
          ver={ver}
          key={title}
          href={href}
          imgSrc={imgSrc}
          title={title}
          sum={sum}
          type={type}
        />
      ))}
    </Wrapper>
  );
};

const Blog = () => {
  return (
    <Wrapper id='blog' topic='Blog' subtitle='A place to pour my thoughts.' className='space-y-4'>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
      <div>
        <div className='cursor-pointer text-zinc-700 hover:underline'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, natus?
        </div>
        <div className='text-zinc-400'>100k Views</div>
      </div>
    </Wrapper>
  );
};
const Reading = () => {
  return (
    <div id='reading'>
      <div className=''>
        <span className='text-2xl font-semibold text-zinc-800 sm:text-3xl'>Reading. </span>
        <span className='text-2xl font-medium text-zinc-500 sm:text-3xl'>
          I reading and enjoy re-reading these.
        </span>
      </div>
      <DialogButton
        titleButton='What does these book means?'
        titleDescription='
        The list of books below means:'
      >
        <li>I have read those books</li>
        <li>I love thems so I reread regularly</li>
        <li>You can discuss with me about the content of the book</li>
        <li>
          These books are my source of inspiration when i building user interface and the user
          experience around it
        </li>
        <li>
          I&#39;m ready to be asked and have the responsibility to be criticized for the knowledge
          of these books
        </li>
      </DialogButton>
      <div className='rounded-md border border-zinc-200  p-5'>
        <h2 className='mb-3 text-2xl font-semibold text-zinc-700'>Technical Frontend Books</h2>
        <section className='grid w-fit grid-flow-row grid-cols-2 gap-5 rounded-md  sm:grid-cols-3 sm:gap-5 sm:gap-x-5 sm:pl-10 md:grid-cols-5'>
          {TechicalBooksData.map(({ title, href, imgSrc }) => (
            <div className=' flex h-full flex-col rounded-md ' key={title}>
              <a
                title={title}
                href={href}
                target='_blank'
                rel='noreferrer noopener'
                className='inline-block h-full'
              >
                <Image src={imgSrc} alt={title} height={190} width={150} />
                <div className='text-[12px] text-zinc-500 sm:text-sm'>{title}</div>
              </a>
            </div>
          ))}
        </section>
        <h2 className='mt-10 mb-3 text-2xl font-semibold text-zinc-700'>
          User Interface & User Experience Books
        </h2>
        <section className='grid w-fit grid-flow-row grid-cols-2 gap-5 rounded-md  sm:grid-cols-3 sm:gap-5 sm:gap-x-5 sm:pl-10 md:grid-cols-5'>
          {UIUXBooksData.map(({ title, href, imgSrc }) => (
            <div className='border-zinc-2s00 flex h-full flex-col ' key={title}>
              <a
                title={title}
                href={href}
                target='_blank'
                rel='noreferrer noopener'
                className='inline-block h-full'
              >
                <Image src={imgSrc} alt={title} height={190} width={150} />
                <div className=' text-[12px] text-zinc-500 sm:text-sm'>{title}</div>
              </a>
            </div>
          ))}
        </section>
        <h2 className='mt-10 mb-3 text-2xl font-semibold text-zinc-700'>Math & Physics Books</h2>
        <section className='grid w-fit grid-flow-row grid-cols-2 gap-5 rounded-md  sm:grid-cols-3 sm:gap-5 sm:gap-x-5 sm:pl-10 md:grid-cols-5'>
          {MathPhysicsBooks.map(({ title, href, imgSrc }) => (
            <div className='border-zinc-2s00 flex h-full flex-col ' key={title}>
              <a
                title={title}
                href={href}
                target='_blank'
                rel='noreferrer noopener'
                className='inline-block h-full'
              >
                <Image src={imgSrc} alt={title} height={190} width={150} />
                <div className='text-[12px] text-zinc-500 sm:text-sm'>{title}</div>
              </a>
            </div>
          ))}
        </section>
        <h2 className='mt-10 mb-3 text-2xl font-semibold text-zinc-700'>
          My Other Learning Sources
        </h2>
        <section className='flex flex-col space-y-2.5 sm:pl-10'>
          {[
            { name: 'Mozilla Developer Network', href: 'https://developer.mozilla.org/en-US/' },
            { name: 'JavaScript.info', href: 'https://javascript.info/' },
            { name: 'FreeCodeCamp', href: 'https://javascript.info/' },
            { name: 'HackerRank', href: 'https://www.hackerrank.com/' },
            { name: 'LeetCode', href: 'https://leetcode.com/' },
            { name: 'SoloLearn', href: 'https://www.sololearn.com/' },
          ].map(({ name, href }) => (
            <ExternalLink key={name} name={name} href={href} />
          ))}
        </section>
        <h2 className='mt-10 mb-3 text-2xl font-semibold text-zinc-700'>
          Computer Science Concepts
        </h2>
        <section className='flex flex-col  sm:pl-10'>
          <ul className='list-outside list-disc space-y-2.5 pl-4'>
            {[
              {
                concept: 'Functional Programming',
                book: 'Grokking Simplicity',
                href: 'https://developer.mozilla.org/en-US/',
              },
              {
                concept: 'Object Oriented Programming with TypeScript',
                book: 'Jeff Zhang',
                href: 'https://www.youtube.com/watch?v=HsWKyERYGKQ&list=PLn4fTSbSpY5eY_M1mKWxGa9pViEodofKy',
              },
              {
                concept: 'Web Design Pattern',
                book: 'Learn Patterns',
                href: 'https://www.patterns.dev/posts/#design-patterns',
              },
              {
                concept: 'Web Rendering Pattern',
                book: 'Learn Patterns',
                href: 'https://www.patterns.dev/posts/#rendering-patterns',
              },
              {
                concept: 'Web Performance Pattern',
                book: 'Learn Patterns',
                href: 'https://www.patterns.dev/posts/#performance-patterns',
              },
            ].map(({ concept, book, href }) => (
              <li key={concept}>
                <span>{concept}</span> <span>—</span> <ExternalLink name={book} href={href} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
