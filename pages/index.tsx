import Layout from '@/components/Layout';
import Image from 'next/future/image';
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
import { MathPhysicsBooks, TechicalBooksData, UIUXBooksData, OthersBookData } from 'data/BooksData';
import React from 'react';
import { TechStackComponent } from '@/components/TechStackComponents';
import ExperimentsIndexBox from '@/components/ExperimentsIndexBox';
import { ExperimentIndexData } from 'data/ExperimentsIndexData';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <div className='mt-5 space-y-20 sm:mt-10 '>
        <Contacts />
        <Projects />
        <Experiments />
        {/* <Blog /> */}
        <TechStack />
        <Reading />
      </div>
    </Layout>
  );
}

const Wrapper = ({
  topic,
  className,
  children,
  id,
}: {
  topic: string;
  className?: string;
  children: React.ReactNode;
  id: string;
}) => {
  return (
    <div id={id}>
      <div className='mb-6 space-y-2'>
        <span className='text-2xl font-semibold text-zinc-800 sm:text-3xl'>{topic}</span>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div
      id='contacts'
      className='grid grid-cols-1 gap-5 bg-white px-5 pt-5 sm:grid-cols-3 sm:px-0 sm:pt-10 lg:grid-cols-4'
    >
      <section className=''>
        <Image
          src='/images/me.jpg'
          height='150'
          width='150'
          className='z-10 rounded-full '
          alt='Harits Syah'
          blurDataURL='/images/me.jpg'
          placeholder='blur'
        />
      </section>
      <section className='space-y-3'>
        <div className='text-xl font-bold text-zinc-800'>Harits Syah</div>
        <div className=' text-zinc-600'>Frontend Engineer</div>
        <div className=' text-zinc-600'>
          Founder,{' '}
          <span className='cursor-pointer font-semibold text-zinc-600 hover:underline'>
            Haris Lab
          </span>
        </div>
        <div className=' text-zinc-600'>Tangerang, Indonesia</div>
      </section>
      <section className='space-y-3'>
        {ContactData.map(c => (
          <ContactComponent
            href={c.href}
            name={c.name}
            key={c.imgSrc}
            imgSrc={c.imgSrc}
            title={c.title}
          />
        ))}
      </section>
    </div>
  );
};

const Projects = () => {
  return (
    <Wrapper
      id='projects'
      topic='Projects'
      className='grid grid-cols-1 gap-8 px-5  sm:grid-cols-3 sm:gap-5 sm:px-0 lg:grid-cols-4'
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
      className='grid grid-flow-row grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4'
    >
      <TechStackComponent data={Backend} title='Backend' />
      <TechStackComponent data={DataVisulization} title='Data Visualization' />
      <TechStackComponent data={Animation} title='Animation' />
      <TechStackComponent data={Hosting} title='Hosting' />
      <TechStackComponent data={ProgrammingLanguage} title='Programming Language' />
      <TechStackComponent data={FrontendFramework} title='Framework' />
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
    <Wrapper id='blog' topic='Blog' className='space-y-4'>
      <div className=''></div>
    </Wrapper>
  );
};
const Reading = () => {
  return (
    <Wrapper id='Reading' topic='Reading' className='columns-1 sm:columns-2 sm:gap-5'>
      <section>
        <h2 className='mb-3 text-xl font-semibold text-zinc-700'>Technical Frontend Books</h2>
        <section className='grid grid-cols-1 gap-2.5'>
          {TechicalBooksData.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-3 text-xl font-semibold text-zinc-700'>UI/UX Books</h2>
        <section className='grid grid-cols-1 gap-2.5'>
          {UIUXBooksData.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-3 text-xl font-semibold text-zinc-700'>Math & Physics Books</h2>
        <section className='grid grid-cols-1 gap-2.5'>
          {MathPhysicsBooks.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-3 text-xl font-semibold text-zinc-700'>Others</h2>
        <section className='grid grid-cols-1 gap-2.5'>
          {OthersBookData.map(({ title, href }) => (
            <ExternalLink key={title} name={title} href={href} />
          ))}
        </section>
      </section>
    </Wrapper>
  );
};
