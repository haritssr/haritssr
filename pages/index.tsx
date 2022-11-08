import ContactComponent from '@/components/ContactComponent';
import InternalLink from '@/components/InternalLink';
import InternalLinkWithoutArrow from '@/components/InternalLinkWithoutArrow';

import { cvDetails } from 'data/cvDetails';
import ExternalLink from '@/components/ExternalLink';
import Layout from '@/components/Layout';
import ProjectsBox from '@/components/ProjectBox';
import { TechStackComponent } from '@/components/TechStackComponents';
import { BriefcaseIcon, BuildingOfficeIcon, MapPinIcon } from '@heroicons/react/24/outline';
import {
	MathPhysicsBooks,
	JavaScriptDocumentation,
	FrontEndBooks,
	UIUXBooks,
	CodingPlatform,
	ReactPatterns,
	ReactBlogs,
} from 'data/BooksData';
import { ExperimentsData } from 'data/ExperimentsData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { WorkContacts } from '../data/WorkContacts';
import { SocialMediaContacts } from '../data/SocialMediaContacts';
import { TechStackData } from '../data/TechStackData';
import ExplanationList from '@/components/ExplanationList';
import { projectCaseStudyData } from 'data/projectCaseStudyData';

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
				<CaseStudies />
				<CV />
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
				<Link href={`/#${id}`} className='text-2xl font-bold text-zinc-800 sm:text-3xl'>
					{topic}
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
			className='grid grid-cols-1 gap-10 bg-white px-10 pt-5 sm:grid-cols-3 sm:gap-5 sm:px-0 sm:pt-10 lg:grid-cols-4'
		>
			<section className='flex justify-center sm:justify-start'>
				<Image
					src='/images/me.jpg'
					height='150'
					width='150'
					className='z-10 rounded-full aspect-ratio'
					alt='Harits Syah'
					blurDataURL='/images/me.jpg'
					placeholder='blur'
				/>
			</section>
			<section className='space-y-3'>
				<div className='text-2xl font-bold text-zinc-800 text-center sm:text-left'>Harits Syah</div>
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
				{WorkContacts.map(c => (
					<ContactComponent
						href={c.href}
						name={c.name}
						key={c.imgSrc}
						imgSrc={c.imgSrc}
						title={c.title}
					/>
				))}
			</section>
			<section className='space-y-3'>
				{SocialMediaContacts.map(c => (
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
			topic='My Projects'
			className='grid grid-cols-1 gap-5 sm:grid-cols-3 sm:px-0 lg:grid-cols-4'
		>
			{projectCaseStudyData.map(d => (
				<ProjectsBox
					key={d.project_name}
					href={d.about_client.website}
					description={d.about_client.short_about}
					title={d.project_name}
					period={d.about_project.working_period}
					status={d.about_project.website_status}
					imgSrc={d.about_client.logo_src}
					industry={d.about_client.industry}
					hrefCaseStudy={d.hrefCaseStudy}
				/>
			))}
		</Wrapper>
	);
};
const Experiments = () => {
	return (
		<Wrapper
			id='experiments'
			topic='My Experiments'
			className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-4'
		>
			{ExperimentsData.map(experiment => (
				<article
					className='overflow-hidden rounded-md border border-apple-gray4'
					key={experiment.id}
				>
					<section className='mb-1 flex justify-between  border-b border-apple-gray4 px-3 py-1.5 bg-apple-gray6/50'>
						<div className='flex items-center space-x-2'>
							<div className='font-semibold text-zinc-700'>{experiment.title}</div>
							<section className='flex items-center'>
								<Image src={experiment.logoSrc} height={16} width={16} alt={experiment.title} />
							</section>
						</div>
						<div className='text-tiny text-zinc-500'>{experiment.links.length}</div>
					</section>
					<ol className='space-y-1 px-3 py-2'>
						{experiment.links.map(link => (
							<li key={link} className='text-zinc-600'>
								<InternalLink
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
			topic='My Tech Stack'
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
					{FrontEndBooks.map(({ title, href }) => (
						<ExternalLink name={title} href={href} key={title} />
					))}
				</section>
			</section>

			<section>
				<h2 className='mt-6 mb-2 text-xl font-semibold text-zinc-700'>UI/UX Books</h2>
				<section className='grid grid-cols-1 gap-2'>
					{UIUXBooks.map(({ title, href }) => (
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
				<h2 className='mt-6 mb-2 text-xl font-semibold text-zinc-700'>Coding Platforms</h2>
				<section className='grid grid-cols-1 gap-2'>
					{CodingPlatform.map(({ title, href }) => (
						<ExternalLink key={title} name={title} href={href} />
					))}
				</section>
			</section>

			<section>
				<h2 className='mt-6 mb-2 text-xl font-semibold text-zinc-700'>JavaScript Documentation</h2>
				<section className='grid grid-cols-1 gap-2'>
					{JavaScriptDocumentation.map(({ title, href }) => (
						<ExternalLink key={title} name={title} href={href} />
					))}
				</section>
			</section>

			<section>
				<h2 className='mt-6 mb-2 text-xl font-semibold text-zinc-700'>React Patterns</h2>
				<section className='grid grid-cols-1 gap-2'>
					{ReactPatterns.map(({ title, href }) => (
						<ExternalLink key={title} name={title} href={href} />
					))}
				</section>
			</section>

			<section>
				<h2 className='mt-6 mb-2 text-xl font-semibold text-zinc-700'>React Blogs</h2>
				<section className='grid grid-cols-1 gap-2'>
					{ReactBlogs.map(({ title, href }) => (
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

const CaseStudies = () => {
	return (
		<Wrapper id='CaseStudies' topic='Case Studies' className=''>
			<InternalLink name='Case Studies' href='/case-studies' />
		</Wrapper>
	);
};

const CV = () => {
	return (
		<Wrapper id='CV' topic='Curriculum Vitae' className='space-y-4'>
			<details className='border border-zinc-400 rounded-md px-4 py-2 select-none cursor-pointer'>
				<summary>CV Summary</summary>
				<div className='pl-4 pt-2'>
					<ExplanationList>
						<li className='font-semibold'>Software Engineering (Web Platform)</li>
						<p className='text-zinc-500'>JavaScript, TypeScript, Next.js, React.js ecosystems.</p>
						<li className='font-semibold'>UI Design (with Figma)</li>
						<p className='text-zinc-500'>
							Experiments, mockup, prototyping UI for mobile/desktop web.
						</p>
						<li className='font-semibold'>Math & Phycics</li>
						<p className='text-zinc-500'>High school and early college level.</p>
					</ExplanationList>
				</div>
			</details>

			<details className='border border-zinc-400 rounded-md px-4 py-2 select-none cursor-pointer'>
				<summary>CV Details</summary>
				<div className='pl-4 pt-2'>
					<section></section>
					<section className='space-y-4'>
						{cvDetails.map(data => (
							<div key={data.section} className='space-y-4'>
								<div className='font-semibold text-2xl'>{data.section}</div>
								{data.section_lists.map(section => (
									<div key={section.id}>
										<div className='flex items-center space-x-2'>
											<Image
												src={section.logo_src}
												height={20}
												width={20}
												alt={section.office}
												className='aspect-auto h-5 w-5'
											/>
											<div className='font-semibold text-lg'>{section.role}</div>
										</div>
										<div className='pl-7 text-zinc-500 space-y-1.5 mt-1.5'>
											<div className=''>{section.office}</div>
											<div className=''>{section.periode}</div>
											<div className=''>{section.desc}</div>
											<div>
												<ExternalLink href={section.site_link} name={section.site_link} />
											</div>
										</div>
									</div>
								))}
							</div>
						))}
					</section>
				</div>
			</details>
		</Wrapper>
	);
};
