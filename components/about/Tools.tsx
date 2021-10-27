import { SubTopic, Topic } from '../DesignSystem';
import { Box } from '@/components/Box';
import { VSCodeLogo, NotionLogo, FigmaLogo, ChromeLogo, FirefoxLogo } from '../webTechIcon';

export default function Tools() {
  return (
    <div>
      <Topic name='Tools' />
      <SubTopic>Tools that are used on daily regular basis</SubTopic>
      <div className='grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2'>
        <TechLink name='VSCode' href='https://www.typescriptlang.org/'>
          <VSCodeLogo />
        </TechLink>

        <TechLink name='Notion' href='https://beta.reactjs.org/'>
          <NotionLogo />
        </TechLink>

        <TechLink name='Figma' href='https://www.tailwindcss.com/'>
          <FigmaLogo />
        </TechLink>

        <TechLink name='Chrome' href='https://www.framer.com/motion/'>
          <ChromeLogo />
        </TechLink>

        <TechLink name='Firefox' href='https://motion.dev/'>
          <FirefoxLogo />
        </TechLink>

        <TechLink name='Microsoft Edge' href='https://git-scm.com/'>
          <VSCodeLogo />
        </TechLink>
      </div>
    </div>
  );
}

const TechLink = ({ children, name, href }) => {
  return (
    <Box href={href}>
      <div className='flex items-center space-x-3'>
        {children}
        <div className='font-medium text-gray-700'>{name}</div>
      </div>
    </Box>
  );
};
