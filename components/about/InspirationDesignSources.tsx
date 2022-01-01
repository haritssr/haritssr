import { SubTopic, Topic } from '../DesignSystem';
import { AppleLogo, NNGLogo, RefactoringUILogo } from '../webTechIcon';
import TechLink from '../TechLink';

export default function WebTech() {
  return (
    <div>
      <Topic name='Inspiration Design Sources' />
      <SubTopic>High quality design consideration sources</SubTopic>
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
