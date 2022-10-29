import { Tab } from '@headlessui/react';
import SubTitle from '@/components/SubTitle';
import ExternalLink from '@/components/ExternalLink';

import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';
import ExplanationList from '@/components/ExplanationList';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ExportedTabs() {
  return (
    <LayoutToExperiments title='Tabs' domain='Headless UI'>
      <SubTitle>
        <ExternalLink name='Headless UI Tabs' href='https://headlessui.com/react/tabs' />
        <ExplanationList>
          <li>
            A fully-managed, renderless dialog component jam-packed with accessibility and keyboard
            features, perfect for building completely custom modal and dialog windows for your next
            application.
          </li>
          <li>
            Click each tab to see what inside and the screen will change to clicked tabs button.
          </li>
        </ExplanationList>
      </SubTitle>
      <Example1 />
      <Example2 />
    </LayoutToExperiments>
  );
}

function Example2() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <Tab.Group selectedIndex={selectedIndex} onChange={() => setSelectedIndex(1)}>
        <Tab.List>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

function Example1() {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className='w-full max-w-md px-2 py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-zinc-200 p-1'>
          {Object.keys(categories).map(category => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-zinc-600',
                  '  focus:shadow focus:outline-none',
                  selected ? 'bg-white text-zinc-700' : 'hover:bg-zinc-300 hover:text-zinc-800'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {/* Object.values(object) returns an 'array of string' from the keys of the object */}
          {/* Here's we looping the keys of the object 'categories' */}
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map(post => (
                  <li key={post.id} className='hover:bg-coolGray-100 relative rounded-md p-3'>
                    <h3 className='text-sm font-medium leading-5'>{post.title}</h3>

                    <ul className='text-coolGray-500 mt-1 flex space-x-1 text-xs font-normal leading-4'>
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href='#'
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
