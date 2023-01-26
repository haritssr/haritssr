import ContactComponent from '@/components/ContactComponent';
import InternalLink from '@/components/InternalLink';
import InternalLinkWithoutArrow from '@/components/InternalLinkWithoutArrow';

import ExternalLink from '@/components/ExternalLink';
import Layout from '@/components/Layout';
import ProjectsBox from '@/components/ProjectBox';
import { TechStackComponent } from '@/components/TechStackComponents';
import {
	BriefcaseIcon,
	BuildingOfficeIcon,
	ChevronDownIcon,
	ChevronRightIcon,
	MapPinIcon,
} from '@heroicons/react/24/outline';
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
import { projectCaseStudyData } from 'data/projectCaseStudyData';

import { Disclosure } from '@headlessui/react';
import { educationData } from 'data/educationData';
import { nonFormalEducationData } from 'data/nonFormalEducationData';
import ExperimentsBox from '@/components/ExperimentsBox';

export default function Home() {
	return (
		<Layout browserTitle='Home' description='Home'>
			<section className='mt-5 space-y-24 sm:mt-10 '>
				<Contacts />
				<Projects />
				<CV />
				<Experiments />
				<TechStack />
				<Reading />
				<DesignSystem />
				<CaseStudies />
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
			<Disclosure defaultOpen={true}>
				{({ open }) => (
					<>
						<section className='mb-5 flex items-center justify-between'>
							<Link href={`/#${id}`} className=' text-2xl font-bold text-zinc-800 sm:text-3xl'>
								{topic}
							</Link>
							<Disclosure.Button>
								<div className='h-8 w-8 bg-apple-gray6/50 hover:bg-apple-gray4/50 flex items-center justify-center rounded-full border border-zinc-200 hover:border-zinc-300'>
									<ChevronDownIcon
										className={` text-zinc-700 h-4 w-4 ${open ? 'rotate-180' : ''}`}
										strokeWidth={3}
									/>
								</div>
							</Disclosure.Button>
						</section>
						<Disclosure.Panel>
							<div className={className}>{children}</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};

const Contacts = () => {
	return (
		<div
			id='contacts'
			className='grid grid-cols-1 gap-10 bg-white px-14 pt-5 sm:grid-cols-3 sm:gap-5 sm:px-0 sm:pt-10 lg:grid-cols-4'
		>
			<section className='flex justify-center sm:justify-start'>
				<Image
					src='/images/me.jpg'
					height='150'
					width='150'
					className='z-10 rounded-full aspect-ratio'
					alt='Harits Syah'
					blurDataURL='/images/me.jpg'
					// placeholder='blur'
				/>
			</section>
			<section className='space-y-3'>
				<div className='text-2xl font-bold text-zinc-800 text-center sm:text-left mb-6 sm:mb-0 font-["Mona_Sans"]'>
					Harits Syah
				</div>
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
			id='my-experience'
			topic='My Experiences'
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
				<div key={experiment.id}>
					<ExperimentsBox experiment={experiment} />
				</div>
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
		<Wrapper id='CV' topic='Curriculum Vitae' className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
			<Disclosure as='div'>
				{({ open }) => (
					<>
						<Disclosure.Button
							className={` border border-apple-gray4 w-full flex items-center justify-between  px-4 py-2 select-none cursor-pointer ${
								open ? 'rounded-b-none rounded-t-md' : 'rounded-md'
							}`}
						>
							<div>Core Skills</div>
							<ChevronDownIcon className={` h-5 w-5 ${open ? 'rotate-180' : ''}`} />
						</Disclosure.Button>
						<Disclosure.Panel className='-mt-[1px] p-4 border border-apple-gray4 rounded-b'>
							<div className='font-semibold'>Software Engineering (Web Platform)</div>
							<p className='text-zinc-500 pb-4'>
								JavaScript, TypeScript, Next.js, React.js, Web platform, PWA.
							</p>
							<div className='font-semibold'>UI Design (with Figma)</div>
							<p className='text-zinc-500 pb-4'>
								Experiments, mockup, prototyping UI for mobile/desktop web.
							</p>
							<div className='font-semibold'>Math & Phycics</div>
							<p className='text-zinc-500'>High school and early college level.</p>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>

			<Disclosure as='div'>
				{({ open }) => (
					<>
						<Disclosure.Button
							className={` border border-apple-gray4 w-full flex items-center justify-between  px-4 py-2 select-none cursor-pointer ${
								open ? 'rounded-b-none rounded-t-md' : 'rounded-md'
							}`}
						>
							<div>CV Details</div>
							<ChevronDownIcon className={` h-5 w-5 ${open ? 'rotate-180' : ''}`} />
						</Disclosure.Button>
						<Disclosure.Panel className='-mt-[1px] px-4 py-8 border border-apple-gray4	 rounded-b'>
							<section className='space-y-8'>
								<div className='font-semibold text-2xl'>Experience</div>

								{projectCaseStudyData.map(project => (
									<div key={project.project_name}>
										<div className='flex items-center justify-between'>
											<div className='flex items-center space-x-2'>
												<Image
													src={project.about_client.logo_src}
													height={20}
													width={20}
													alt={project.about_client.company_name}
													className='aspect-auto h-5 w-5'
													blurDataURL={project.about_client.logo_src}
													// placeholder='blur'
												/>
												<div className='font-semibold text-lg'>
													{project.about_project.my_role[0]}
												</div>
											</div>
											<Link
												passHref
												href={`/case-studies/${project.hrefCaseStudy}`}
												className='flex items-center justify-end text-zinc-400 hover:underline'
											>
												<div className='text-tiny '>Details</div>
												<ChevronRightIcon className='h-4 w-4' />
											</Link>
										</div>
										<div className='pl-7 text-zinc-500 space-y-1.5 mt-1.5'>
											<div>{project.about_client.company_name}</div>
											<div>{project.about_project.working_period}</div>
											<div>{project.skills}</div>
											<div>
												<ExternalLink
													href={project.about_client.website}
													name={project.about_client.website}
												/>
											</div>
										</div>
									</div>
								))}

								<div className='font-semibold text-2xl'>Formal Education</div>

								{educationData.map(school => (
									<div key={school.school}>
										<div className='flex items-center space-x-2'>
											<Image
												src={school.logo}
												height={20}
												width={20}
												alt={school.school}
												className='aspect-auto h-5 w-5'
												blurDataURL={school.logo}
												// placeholder='blur'
											/>
											<div className='font-semibold text-lg'>{school.level}</div>
										</div>

										<div className='pl-7 text-zinc-500 space-y-1.5 mt-1.5'>
											<div>{school.school}</div>
											<div>{school.period}</div>
											<div>{school.status}</div>
										</div>
									</div>
								))}

								<div className='font-semibold text-2xl'>Non Formal Education</div>

								{nonFormalEducationData.map(school => (
									<div key={school.school}>
										<div className='flex items-center space-x-2'>
											<Image
												src={school.logo}
												height={20}
												width={20}
												alt={school.school}
												className='aspect-auto h-5 w-5'
												blurDataURL={school.logo}
												// placeholder='blur'
											/>
											<div className='font-semibold text-lg'>{school.level}</div>
										</div>
										<div className='pl-7 text-zinc-500 space-y-1.5 mt-1.5'>
											<div>{school.school}</div>
											<div>{school.period}</div>
											<div>{school.status}</div>
											<ExternalLink name='Sertificate' href='www.harislab.com' />
										</div>
									</div>
								))}
							</section>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</Wrapper>
	);
};
