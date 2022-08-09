import LayoutToExperiments from '@/components/LayoutToExperiments';
import { ExternalLink, SubTitle } from '@/components/DesignSystem';

export default function DescriptionList() {
  return (
    <LayoutToExperiments title='Description List' domain='Browser'>
      <SubTitle>
        <ExternalLink
          href='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl'
          name='The Description List element'
        />
        <br />
        Glossary with built-in dl, dt, dd browser API.
        <br />
        The default style overrided by Tailwind CSS preflight.
        <br />
        In apperance it just about styling, but from HTML perspective it is semantic element for
        accesibility.
      </SubTitle>
      <dl className='sm:w-1/2'>
        <dt className='font-bold'>This is title</dt>
        <dd className='mb-5 pl-10'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nam.
        </dd>
        <dt className='font-bold'>This is title</dt>
        <dd className='mb-5 pl-10'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla autem ipsa ullam
          voluptatibus vero deleniti provident officia id. Id recusandae minus facilis deleniti
          maiores non possimus doloribus perspiciatis fugiat unde.
        </dd>
        <dt className='font-bold'>This is title</dt>
        <dd className='mb-5 pl-10'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, nam.
        </dd>
      </dl>
    </LayoutToExperiments>
  );
}
