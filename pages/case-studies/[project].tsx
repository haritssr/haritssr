import BackButton from '@/components/BackButton';
import ExplanationList from '@/components/ExplanationList';
import ExternalLink from '@/components/ExternalLink';
import Layout from '@/components/Layout';
import Section from '@/components/Section';
import { projectCaseStudyData } from 'data/projectCaseStudyData';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = projectCaseStudyData.map(({ hrefCaseStudy }) => {
		return { params: { project: hrefCaseStudy } };
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async context => {
	const project = projectCaseStudyData.filter(p => p.hrefCaseStudy === context.params?.project)[0];

	return {
		props: { project },
	};
};

import Head from 'next/head';
import { useRouter } from 'next/router';
import GlobalHead from '@/components/GlobalHead';
import Footer from '@/components/Footer';

export default function CaseStudyPage({ project }) {
	const router = useRouter();
	const image = '/images/hero.jpg';
	const type = 'website';

	const browserTitle = 'Case Study';
	const description = 'Case Studies';
	return (
		<div className='bg-white'>
			<Head>
				<title>{router.asPath === '/' ? 'Harits Syah' : `${browserTitle} - Harits Syah`}</title>
				<link rel='icon' href='/icons/haritssr.png' />
				<meta name='theme-color' content='#27272a' />
				<meta name='robots' content='follow, index' />
				<meta name='description' content={description} />
				<meta property='og:type' content={type} />
				<meta property='og:site_name' content='HarisLab' />
				<meta property='og:description' content={description} />
				<meta property='og:title' content={browserTitle} />
				<meta property='og:image' content={image} />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:site' content='@haritssr' />
				<meta name='twitter:title' content={browserTitle} />
				<meta name='twitter:description' content={description} />
				<meta name='twitter:image' content={image} />
				<link rel='manifest' href='/static/favicons/site.webmanifest' />
			</Head>

			<GlobalHead />

			<main className='mx-auto min-h-screen w-full max-w-3xl px-5 xl:px-0'>
				<BackButton href='/case-studies' name='All Case Studies' />
				{/* Title */}
				<section className='mt-5 sm:mt-10 py-5 flex items-center justify-between'>
					<div className=''>
						<div className='mb-1 text-zinc-600 text-xl sm:text-2xl'>Case Study</div>
						<div className='text-3xl sm:text-4xl break-words font-bold font-["Mona_Sans"]'>
							{project.project_name}
						</div>
					</div>
					<Image
						src={project.about_client.logo_src}
						alt={project.project_name}
						height='70'
						width='70'
					/>
				</section>
				<section className='mt-10 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 sm:gap-32 gap-10'>
					{/* About The Client */}
					<section>
						<h2 className='mb-4 text-xl font-semibold text-zinc-800 uppercase font-["Hubot_Sans"]'>
							About The Client
						</h2>
						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>Company Name</div>
						<p className='text-zinc-500'>{project.about_client.company_name}</p>

						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>Brand Name</div>
						<p className='text-zinc-500'>{project.about_client.brand_name}</p>

						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>About</div>
						<p className='text-zinc-500'>{project.about_client.long_about}</p>

						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>Phone Number</div>
						<p className='text-zinc-500'>{project.about_client.phone_number}</p>

						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>Website</div>
						<ExternalLink href={project.about_client.website} name={project.about_client.website} />
						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>
							Office Location
						</div>
						<p className='text-zinc-500'>{project.about_client.office_location}</p>
					</section>

					{/* About The Project */}
					<section>
						<h2 className='mb-4 text-xl font-semibold text-zinc-800 uppercase font-["Hubot_Sans"]'>
							About The Project
						</h2>

						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>My Role</div>
						<ExplanationList>
							{project.about_project.my_role.map((a: string) => (
								<li className='text-zinc-500' key={a}>
									{a}
								</li>
							))}
						</ExplanationList>

						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>Working Period</div>
						<p className='text-zinc-500'>{project.about_project.working_period}</p>

						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>Website Status</div>
						<ExplanationList>
							{project.about_project.website_status.map((a: string) => (
								<li className='text-zinc-500' key={a}>
									{a}
								</li>
							))}
						</ExplanationList>

						<div className='mt-4 text-zinc-800 font-medium font-["Hubot_Sans"]'>Website Routes</div>
						<ExplanationList>
							{project.about_project.routes.map((a: string) => (
								<li className='text-zinc-500' key={a}>
									{a}
								</li>
							))}
						</ExplanationList>
					</section>
				</section>

				{/* Design */}
				<section className='mt-10'>
					<h2 className='mb-4 text-xl font-semibold text-zinc-800 uppercase'>Design</h2>
					<Suspense fallback={<div>Loading...</div>}>
						{project.figma !== '' ? (
							<iframe className='w-full h-[600px]' src={project.figma} allowFullScreen></iframe>
						) : (
							<p className='text-zinc-800 font-["Hubot_Sans"]'>No design</p>
						)}
					</Suspense>
				</section>
			</main>

			<Footer />
		</div>
	);
}
