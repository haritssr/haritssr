import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

const divStyle = 'border-[1.5px] rounded-md border-zinc-400 p-3';

const Container = ({ setCounter }) => (
  <div className={divStyle}>
    <AddOneButton setCounter={setCounter} />
  </div>
);

const AddOneButton = ({ setCounter }) => (
  <div className={divStyle}>
    <button
      className='rounded bg-blue-500 px-2 py-1 text-white shadow-md hover:bg-blue-600'
      onClick={() => setCounter((v: number) => v + 1)}
    >
      Add one
    </button>
  </div>
);

const Counter = ({ counter }) => <div className={divStyle}>Counter : {counter}</div>;

export default function CounterUseState() {
  const [counter, setCounter] = useState(0);
  return (
    <LayoutToExperiments title='Counter useState drop drilling' domain='React'>
      <SubTitle>Make a counter using useState and pop drilling</SubTitle>
      <div className={`${divStyle} space-y-3`}>
        <Container setCounter={setCounter} />
        <Counter counter={counter} />
      </div>
    </LayoutToExperiments>
  );
}
