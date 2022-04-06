import { ExternalLink, SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { Sandpack } from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';

export default function Example1() {
  return (
    <LayoutToExperiments title='Example 1' domain='Sandpack'>
      <SubTitle>
        <ExternalLink href='https://codesandbox.io/post/sandpack-announcement' name='Source' />
      </SubTitle>
      <div>
        <Sandpack
          customSetup={{
            dependencies: {
              lodash: 'latest',
            },
            files: {
              '/App.js': {
                code: APP_CODE,
              },
            },
          }}
          template='react'
        />
      </div>
    </LayoutToExperiments>
  );
}

const APP_CODE = `
import { sum } from 'lodash';

export default function App() {
  return <>
    <h1>Hello Sandpack!</h1>
    <h2>{sum([2, 3])}</h2>
  </>
}
`.trim();
