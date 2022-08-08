import Layout from '@/components/Layout';
import Image from 'next/image';
import ContactComponent from '@/components/ContactComponent';
import { ExternalLink, InternalLink } from '@/components/DesignSystem';
import { TechnologyData } from '../data/TechnologyData';
import { ContactData } from '../data/ContactData';
import ProjectsBox from '@/components/ProjectBox';
import { ProjectsData } from '../data/ProjectsData';
import { BooksData } from 'data/BooksData';
import React from 'react';

export default function Home() {
  return (
    <Layout browserTitle='Projects' description='Home'>
      <div className='mt-5 space-y-20 sm:mt-10'>
        <Contacts />
        <Projects />
        <TechStack />
        <Experiments />
        <Blog />
        <FavoriteReading />
      </div>
    </Layout>
  );
}

interface WrapperType {
  topic: string;
  subtitle: string;
  className?: string;
  children: React.ReactNode;
  id: string;
}

const Wrapper = ({ topic, subtitle, className, children, id }: WrapperType) => {
  return (
    <div id={id}>
      <div className='mb-5'>
        <span className='text-2xl font-semibold text-zinc-700'>{topic}. </span>
        <span className='text-2xl font-medium text-zinc-400'>{subtitle}.</span>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div
      id='contacts'
      className='grid grid-cols-1 gap-10 rounded-2xl border border-zinc-300 bg-gradient-to-b from-zinc-50 via-white to-white p-10 sm:grid-cols-2 sm:gap-0 sm:bg-gradient-to-r sm:via-zinc-50'
    >
      <section className='mx-auto flex flex-col sm:mx-0 sm:mr-10  sm:px-0 sm:pl-4'>
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
        <article className='space-y-2 text-center sm:my-auto sm:text-left'>
          <div className='text-2xl font-bold text-zinc-800'>Harits Syah R</div>
          <div className='text-lg font-medium text-zinc-700'>Web Frontend React Engineer</div>
          <div className='flex justify-center sm:justify-start'>
            <ExternalLink big={true} name='Haris Lab' href='https://www.harislab.com' />
          </div>
        </article>
      </section>
      <section id='contacts' className=' top-24 px-5 sm:top-0 sm:flex sm:justify-end sm:px-0'>
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
  );
};

const Projects = () => {
  return (
    <Wrapper
      id='Projects'
      topic='Projects'
      subtitle='Hosted frontend projects'
      className='grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4'
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
      id='TechStack'
      topic='Tech Stack'
      subtitle='Technology i comfortable and experience working with'
      className='grid grid-flow-row grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4'
    >
      {TechnologyData.map(c => (
        <ContactComponent
          href={c.href}
          name={c.name}
          key={c.name}
          imgSrc={c.imgSrc}
          title={c.href}
        />
      ))}
    </Wrapper>
  );
};

const FavoriteReading = () => {
  return (
    <Wrapper
      id='FavoriteReading'
      topic='Favorite Reading'
      subtitle='Book or writing I&#39;ve read and enjoy reread'
      className='grid w-fit grid-flow-row grid-cols-2 gap-3 rounded-md bg-gray-50 p-4 sm:grid-cols-3 sm:gap-5 sm:gap-x-5 md:grid-cols-5'
    >
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
    </Wrapper>
  );
};

const Experiments = () => {
  return (
    <Wrapper
      id='Experiments'
      topic='Experiments'
      subtitle='Everything I tried i dump here'
      className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 '
    >
      <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, atque iure! Accusantium
        voluptatibus nobis autem quo voluptates numquam tenetur facilis.
      </div>
      <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, atque iure! Accusantium
        voluptatibus nobis autem quo voluptates numquam tenetur facilis.
      </div>
      <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, atque iure! Accusantium
        voluptatibus nobis autem quo voluptates numquam tenetur facilis.
      </div>
      <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, atque iure! Accusantium
        voluptatibus nobis autem quo voluptates numquam tenetur facilis.
      </div>
      <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, atque iure! Accusantium
        voluptatibus nobis autem quo voluptates numquam tenetur facilis.
      </div>
      <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, atque iure! Accusantium
        voluptatibus nobis autem quo voluptates numquam tenetur facilis.
      </div>
      <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, atque iure! Accusantium
        voluptatibus nobis autem quo voluptates numquam tenetur facilis.
      </div>
      <div className='rounded-lg border border-zinc-200 bg-zinc-50 p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, atque iure! Accusantium
        voluptatibus nobis autem quo voluptates numquam tenetur facilis.
      </div>
    </Wrapper>
  );
};

const Blog = () => {
  return (
    <Wrapper id='Blog' topic='Blog' subtitle='My though' className=''>
      <div className=''></div>
    </Wrapper>
  );
};
