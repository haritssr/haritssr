import InternalLink from '@/components/InternalLink';
import BackButton from '@/components/BackButton';
import { experienceCaseStudyData } from 'data/experienceCaseStudyData';

import Head from 'next/head';
import { useRouter } from 'next/router';
import GlobalHead from '@/components/GlobalHead';
import Footer from '@/components/Footer';

export default function CaseStudiesHomePage() {
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
				<BackButton href='/#my-experience' name='All Projects' />
				<div className='text-3xl mt-5 sm:mt-14 break-words font-semibold pb-3 font-["Hubot_Sans"]'>
					Case Studies
				</div>
				<section className='space-y-3'>
					{experienceCaseStudyData.map(({ project_name, hrefCaseStudy }) => (
						<InternalLink
							key={project_name}
							name={project_name}
							href={`/case-studies/${hrefCaseStudy}`}
						/>
					))}
				</section>
			</main>

			<Footer />
		</div>
	);
}
