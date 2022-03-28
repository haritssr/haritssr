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
    hrefCaseStudy: '/experiments',
  },

  {
    href: 'https://www.harisstudio.com',
    title: 'Haris Studio',
    description: 'Create, booking, and maintaining website.',
    period: 'Jan 2022 - Now',
    status: 'Development',
    imgSrc: <LogoHarisStudio />,
    industry: 'Website agency',
    hrefCaseStudy: '/experiments',
  },
  {
    href: 'https://www.haritssr.com',
    title: 'Harits Syah',
    description: 'My personal site. Article and experiments.',
    period: 'Jan 2022 - Now',
    status: 'Production',
    imgSrc: <LogoHaritssr />,
    industry: 'Personal',
    hrefCaseStudy: '/experiments',
  },
  {
    href: 'https://www.aka-tradingindo.com',
    title: 'AKA Trading',
    description: 'Coffee and spices from Indonesia',
    period: 'May 21 - Des 2021',
    status: 'Change mgmnt',
    imgSrc: <Image src='/aka.PNG' width='24' height='24' alt='' />,
    industry: 'Coffee',
    hrefCaseStudy: '/experiments',
  },
];
