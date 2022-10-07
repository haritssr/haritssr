import Layout from '@/components/Layout';
import Image from 'next/future/image';
import ContactComponent from '@/components/ContactComponent';
import { ExternalLink, InternalLink, Topic } from '@/components/DesignSystem';
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
import { color } from '../data/DesignSystemData';
import { LogoHaritssr } from '@/components/Icons';

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
        <DesignSystem />
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
        <span className='text-2xl font-bold text-zinc-800 sm:text-3xl'>{topic}</span>
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
        <div className=' text-zinc-700'>Frontend Engineer</div>
        <div className=' text-zinc-700'>
          Founder,{' '}
          <span className='cursor-pointer font-semibold text-zinc-700 hover:underline'>
            Haris Lab
          </span>
        </div>
        <div className=' text-zinc-700'>Tangerang, Indonesia</div>
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
          key={title}
          ver={ver}
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
        <h2 className='mb-4 text-xl font-semibold text-zinc-700'>Technical Frontend Books</h2>
        <section className='grid grid-cols-1 gap-2.5'>
          {TechicalBooksData.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-4 text-xl font-semibold text-zinc-700'>UI/UX Books</h2>
        <section className='grid grid-cols-1 gap-2.5'>
          {UIUXBooksData.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-4 text-xl font-semibold text-zinc-700'>Math & Physics Books</h2>
        <section className='grid grid-cols-1 gap-2.5'>
          {MathPhysicsBooks.map(({ title, href }) => (
            <ExternalLink name={title} href={href} key={title} />
          ))}
        </section>
      </section>

      <section>
        <h2 className='mt-6 mb-4 text-xl font-semibold text-zinc-700'>Others</h2>
        <section className='grid grid-cols-1 gap-2.5'>
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
    <Wrapper topic='Design System' className='' id='DesignSystem'>
      <Topic name='Color' />
      <section className='mb-10 -mt-2 grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        {color.map(data => (
          <div className='space-y-1' key={data.name}>
            <div style={{ backgroundColor: data.hex }} className={` h-16 w-16 rounded-md border`} />
            <div className='text-zinc-700'>{data.hex}</div>
            <div className='text-zinc-500'>{data.name}</div>
          </div>
        ))}
      </section>
      <Topic name='Button' />
      <section className='mb-10 -mt-2 grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        <div className='space-y-1'>
          <ExternalLink href='/' name='ExternalLink' />
          <div className='text-zinc-500'>External Link</div>
        </div>
        <div className='space-y-1'>
          <InternalLink href='/' name='InternalLink' />
          <div className='text-zinc-500'>Internal Link</div>
        </div>
        <div className='space-y-1'>
          <button className='rounded-md bg-blue-600 px-4 py-1 text-white hover:bg-blue-500'>
            Button
          </button>
          <div className='text-zinc-500'>Primary Button</div>
        </div>
        <div className='space-y-1'>
          <button className='rounded-md border border-blue-600 bg-white px-4 py-1 text-blue-600 hover:bg-blue-100'>
            Button
          </button>
          <div className='text-zinc-500'>Secondary Button</div>
        </div>
      </section>
      <Topic name='Typography' />
      <section className='mb-10 -mt-2  grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        <div className='space-y-1'>
          <div className='text-2xl font-bold text-zinc-800 sm:text-3xl'>Heading</div>
          <div className='text-zinc-500'>Heading</div>
        </div>
        <div className='space-y-1'>
          <div className='text-xl font-semibold text-zinc-700'>Heading 2</div>
          <div className='text-zinc-500'>Heading 2</div>
        </div>
        <div className='space-y-1'>
          <div className='text-[17px] leading-relaxed text-zinc-700 sm:text-base'>
            Short paragraph example
          </div>
          <div className='text-zinc-500'>Paragraph</div>
        </div>
      </section>
      <Topic name='Icon' />
      <section className='mb-10 -mt-2 grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        <div className='space-y-1'>
          <LogoHaritssr />
          <div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
          <div className='text-zinc-500'>Mobile</div>
        </div>
        <div className='space-y-1'>
          <LogoHaritssr />
          <div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
          <div className='text-zinc-500'>Desktop</div>
        </div>
        <div className='space-y-1'>
          <div className='w-fit rounded-md border bg-zinc-800 p-2'>
            <LogoHaritssr />
          </div>
          <div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
          <div className='text-zinc-500'>On dark background</div>
        </div>
        <div className='space-y-1'>
          <div className='w-fit rounded-md border bg-white p-2'>
            <LogoHaritssr />
          </div>
          <div className='text-zinc-700'>w-5 h-5 [20x20px]</div>
          <div className='text-zinc-500'>On light background</div>
        </div>
      </section>
      <Topic name='Box' />
      <section className='mb-10 -mt-2 grid grid-cols-2 gap-5 border-t pt-2 sm:grid-cols-3 lg:grid-cols-4'>
        <div className='space-y-1'>
          <div className='h-40 overflow-hidden rounded-md border border-zinc-300 bg-gradient-to-bl from-zinc-50 via-white to-white' />
          <div className='text-zinc-500'>Box</div>
        </div>
      </section>
    </Wrapper>
  );
};
