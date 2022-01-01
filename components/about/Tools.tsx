import { SubTopic, Topic } from '../DesignSystem';
import { VSCodeLogo, NotionLogo, FigmaLogo, ChromeLogo } from '../webTechIcon';
import TechLink from '../TechLink';

export default function Tools() {
  return (
    <div>
      <Topic name='Tools' />
      <SubTopic>Main apps on my computer</SubTopic>
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
      </div>
    </div>
  );
}
