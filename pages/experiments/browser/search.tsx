import { ExternalCodeLink, ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
// import { useKBar } from 'kbar';

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
  NO_GROUP,
  KBarResults,
} from 'kbar';

export default function Search() {

  // const { query } = useKBar();

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className='z-50 bg-zinc-800/70 backdrop-blur-sm'>
          <KBarAnimator className='w-2/3 overflow-hidden rounded-md shadow-xl sm:w-1/3'>
            <KBarSearch className='w-full border-b border-zinc-300 bg-zinc-100 px-4 py-2 text-zinc-700 focus:outline-none' />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      <LayoutToExperiments title='Search' domain='Browser UI'>
        <SubTitle>
          Search using <ExternalLink href='https://kbar.vercel.app/' name='KBar' /> by{' '}
          <ExternalLink name='TimChang' href='https://twitter.com/timcchang' />, click the search
          button or click <code className='text-green-600'>ctrl+k</code> to open the search modal.
        </SubTitle>

        <button
          // onClick={query.toggle}
          className='group rounded-md bg-zinc-200 p-1.5 hover:bg-zinc-300'
        >
          {/* Search Button from Heroicons */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 text-zinc-600 hover:text-zinc-900'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>

        <div>
          Please press <code className='text-green-600'>ctrl+k</code>, because the above{' '}
          <code>&quot;onClick=query.toggle&quot;</code> toggle button does not work when i move to
          this page from the _app.js page.
        </div>
      </LayoutToExperiments>
    </KBarProvider>
  );
}

// type Action = {
//   id: ActionId;
//   name: string;
//   shortcut?: string[];
//   keywords?: string;
//   section?: string;
//   icon?: string | React.ReactElement | React.ReactNode;
//   subtitle?: string;
//   perform?: (currentActionImpl: ActionImpl) => any;
//   parent?: ActionId;
// };

const actions = [
  {
    id: 'article',
    name: 'Article',
    shortcut: ['a'],
    keywords: 'writing words',
    perform: () => (window.location.pathname = 'article'),
  },
  {
    id: 'experiments',
    name: 'Experiments',
    shortcut: ['e'],
    keywords: 'email',
    perform: () => (window.location.pathname = 'experiments'),
  },
];

function RenderResults() {

  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div>{item}</div>
        ) : (
          <div className={`${active ? 'cursor-pointer bg-zinc-200' : 'bg-white'} px-4 py-2`}>
            {item.name}
          </div>
        )
      }
    />
  );
}
