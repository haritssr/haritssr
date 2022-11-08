import { LogoHaritssr, LogoHarisStudio, LogoHarisLab } from '@/Icons';
import Image from 'next/image';

export const ProjectsData = [
	{
		href: 'https://www.harislab.com',
		title: 'Haris Lab',
		description: 'Learn Math, Physics, and Private Lesson',
		period: 'Jun 2021 - Now',
		status: 'Production',
		imgSrc: <LogoHarisLab />,
		industry: 'Education',
		hrefCaseStudy: 'aka-tradingindo',
	},

	{
		href: 'https://www.harisstudio.com',
		title: 'Haris Studio',
		description: 'Create, booking, and maintaining website.',
		period: 'Jan 2022 - Now',
		status: 'Suspended',
		imgSrc: <LogoHarisStudio />,
		industry: 'Website Agency',
		hrefCaseStudy: 'aka-tradingindo',
	},
	{
		href: 'https://www.haritssr.com',
		title: 'Harits Syah',
		description: 'My personal site. Blog and experiments.',
		period: 'Jan 2022 - Now',
		status: 'Production',
		imgSrc: <LogoHaritssr />,
		industry: 'Personal Site',
		hrefCaseStudy: 'aka-tradingindo',
	},
	{
		href: 'https://www.aka-tradingindo.com',
		title: 'AKA Trading',
		description: 'Coffee and spices from Indonesia',
		period: 'May 21 - Des 2021',
		status: 'Production',
		imgSrc: <Image src='/icons/aka.PNG' width='24' height='24' alt='' />,
		industry: 'Coffee & Spices',
		hrefCaseStudy: 'aka-tradingindo',
	},
	{
		href: 'https://www.mixaperkasa.com',
		title: 'Mixa Perkasa',
		description: 'Perusahaan yang bergerak di bidang struktur dan beton.',
		period: 'Oktober 2022',
		status: 'Production',
		imgSrc: <Image src='/icons/mpi.svg' width='24' height='24' alt='' />,
		industry: 'Struktur dan Beton',
		hrefCaseStudy: 'aka-tradingindo',
	},
];
