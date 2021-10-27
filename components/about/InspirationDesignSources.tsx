import { SubTopic, Topic } from '../DesignSystem';
import { Box } from '@/components/Box';
import { AppleLogo, NNGLogo, RefactoringUILogo } from '../webTechIcon';

export default function WebTech() {
  return (
    <div>
      <Topic name='Inspiration Design Source' />
      <SubTopic>
        The high quality design consideration sources that i considered in all my application and
        combines with study on user experience best practice in order to make a aesthetic integrity
        website or web application
      </SubTopic>
      <div className='grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2'>
        <TechLink name='Apple Design' href='https://developer.apple.com/videos/design/'>
          <AppleLogo />
        </TechLink>

        <TechLink
          name='Apple HIG'
          href='https://developer.apple.com/design/human-interface-guidelines/'
        >
          <AppleLogo />
        </TechLink>

        <TechLink name='NNGroup' href='https://www.nngroup.com/articles/'>
          <NNGLogo />
        </TechLink>

        <TechLink name='Refactoring UI' href='https://www.refactoringui.com/'>
          <RefactoringUILogo />
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
