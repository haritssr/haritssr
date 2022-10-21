import ContactComponent from '@/components/ContactComponent';
import { ExternalLink, InternalLink, InternalLinkWithoutArrow } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import ProjectsBox from '@/components/ProjectBox';
import { TechStackComponent } from '@/components/TechStackComponents';
import { BriefcaseIcon, BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { MathPhysicsBooks, OthersBookData, TechicalBooksData, UIUXBooksData } from 'data/BooksData';
import { ExperimentsData } from 'data/ExperimentsData';
import Image from 'next/future/image';
import Link from 'next/link';
import React from 'react';
import { ContactData } from '../data/ContactData';
import { ProjectsData } from '../data/ProjectsData';
import { TechStackData } from '../data/TechStackData';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <section className='mt-5 space-y-20 sm:mt-10 '>
        <Contacts />
        <Projects />
        <Experiments />
        <TechStack />
        <Reading />
        <DesignSystem />
      </section>
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
        <Link href={`/#${id}`}>
          <a className='text-2xl font-bold text-zinc-800 sm:text-3xl'>{topic}</a>
        </Link>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div
      id='contacts'
      className='grid grid-cols-1 gap-10 bg-white px-5 pt-5 sm:grid-cols-3 sm:gap-5 sm:px-0 sm:pt-10 lg:grid-cols-4'
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
        <div className='text-2xl font-bold text-zinc-800'>Harits Syah</div>
        <div className='flex items-center space-x-1'>
          <BriefcaseIcon className=' h-5 w-5 text-zinc-700' strokeWidth={1.8} />
          <div className=' text-zinc-800'>
            Software Engineer, <InternalLinkWithoutArrow href='#techstack' name='Web' />
          </div>
        </div>
        <div className='flex items-center space-x-1'>
          <BuildingOfficeIcon className=' h-5 w-5 text-zinc-700' strokeWidth={1.8} />
          <div className=' text-zinc-800'>
            Founder, <ExternalLink href='https://www.harislab.com' name='Haris Lab' />
          </div>
        </div>
        <div className='flex items-center space-x-1'>
          <MapPinIcon className=' h-5 w-5 text-zinc-700' strokeWidth={1.8} />
          <div className=' text-zinc-800'>Tangerang, Indonesia</div>
        </div>
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
      className='grid grid-cols-1 gap-5 sm:grid-cols-3 sm:px-0 lg:grid-cols-4'
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
const Experiments = () => {
  return (
    <Wrapper
      id='experiments'
      topic='Experiments'
      className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4'
    >
      {ExperimentsData.map(experiment => (
        <article
          className='overflow-hidden rounded-md border border-apple-gray4'
          key={experiment.id}
        >
          <section className='mb-1 flex justify-between  border-b border-apple-gray4 px-3 py-1.5'>
            <div className='flex items-center space-x-2'>
              <div className='font-semibold text-zinc-700'>{experiment.title}</div>
              <section className='flex items-center'>
                <Image src={experiment.logoSrc} height={16} width={16} alt={experiment.title} />
              </section>
            </div>
            <div className='text-tiny text-zinc-600'>{experiment.links.length}</div>
          </section>
          <ol className='space-y-1 px-3 py-2'>
            {experiment.links.map(link => (
              <li key={link} className='text-zinc-600'>
                <InternalLinkWithoutArrow
                  href={`/experiments/${experiment.title.toLowerCase().replace(' ', '-')}/${link
                    .toLowerCase()
                    // /\s/g regex -> search all (g = global) whitespace, and replace them with '-'
                    .replace(/\s/g, '-')}`}
                  name={link}
                />
              </li>
            ))}
          </ol>
        </article>
      ))}
    </Wrapper>
  );
};
const TechStack = () => {
  return (
    <Wrapper
      id='techstack'
      topic='Tech Stack'
      className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4'
    >
      {TechStackData.map(data => (
        <TechStackComponent domain={data?.domain} links={data?.links} key={data?.domain} />
      ))}
    </Wrapper>
  );
};

const Reading = () => {
  return (
    <Wrapper id='Reading' topic='Reading' className='columns-1 sm:columns-2 sm:gap-5'>
      <section>
        <h2 className='mb-2 text-xl font-semibold text-zinc-700'>Technical Frontend Books</h2>
        <section className='grid grid-cols-1 gap-2'>
          {TechicalBooksData.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-2 text-xl font-semibold text-zinc-700'>UI/UX Books</h2>
        <section className='grid grid-cols-1 gap-2'>
          {UIUXBooksData.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-2 text-xl font-semibold text-zinc-700'>Math & Physics Books</h2>
        <section className='grid grid-cols-1 gap-2'>
          {MathPhysicsBooks.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-2 text-xl font-semibold text-zinc-700'>Others</h2>
        <section className='grid grid-cols-1 gap-2'>
          {OthersBookData.map(({ title, href }) => (
            <ExternalLink key={title} name={title} href={href} />
          ))}
        </section>
      </section>
    </Wrapper>
  );
};

const DesignSystem = () => {
  return (
    <Wrapper id='DesignSystem' topic='Design System' className=''>
      <InternalLink name='Design System' href='/design-system' />
    </Wrapper>
  );
};
