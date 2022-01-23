import { SubTitle, SubTopic, Topic } from '@/components/DesignSystem';
import { VercelLogoIcon } from '@radix-ui/react-icons';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Box from '@/components/Box';
import { ContactsData } from '../lib/ContactsData';
import { ToolsData } from '../lib/ToolsData';
import { TechStack } from '../lib/TechStack';
import { FramerMotionLogo } from '@/components/Icons';

export default function About() {
  return (
    <Layout browserTitle='About' description='About'>
      <h2
        className='z-40 block w-full h-auto pt-16 pb-3 mx-auto text-3xl font-extrabold text-gray-800 sm:text-4xl '
      >
        About
      </h2>
      <SubTitle>Information and for connection</SubTitle>
      <div className='grid grid-cols-2 gap-y-14 sm:gap-x-10 sm:grid-cols-3'>
        {/* Contact */}
        <section>
          <Topic name='Contacts' />
          <SubTopic>Reach me here</SubTopic>
          <div className='grid grid-cols-1 sm:gap-x-5 sm:gap-y-2'>
            {ContactsData.map(c => (
              <Box title={c.title} href={c.href} name={c.name} key={c.name}>
                <Image src={c.imgSrc} height={24} width={24} alt={c.name} />
              </Box>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section>
          <Topic name='Tools' />
          <SubTopic>Main apps on my computer</SubTopic>
          <div className='grid grid-cols-1 sm:gap-x-5 sm:gap-y-2'>
            {ToolsData.map(c => (
              <Box title={c.title} href={c.href} name={c.name} key={c.name}>
                <Image src={c.imgSrc} height={24} width={24} alt={c.name} />
              </Box>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <Topic name='Tech Stack' />
          <SubTopic>My stack to make a website or webapps</SubTopic>
          <div className='grid grid-cols-1 sm:gap-x-5 sm:gap-y-2'>
            {TechStack.map(c => (
              <Box title={c.title} href={c.href} name={c.name} key={c.name}>
                <Image src={c.imgSrc} height={24} width={24} alt={c.name} />
              </Box>
            ))}

            <Box
              title='This link will go to Framer Motion website'
              name='Framer Motion'
              href='https://www.framer.com/motion/'
            >
              <FramerMotionLogo />
            </Box>
            <Box
              title='This link will go to Vercel website'
              name='Vercel'
              href='https://vercel.com/'
            >
              <VercelLogoIcon />
            </Box>
          </div>
        </section>
      </div>
    </Layout>
  );
}
