import LayoutToExperiments from '@/components/LayoutToExperiments';
import { SubTitle } from '@/components/DesignSystem';
import { useState, createContext, useContext } from 'react';

const CounterContext = createContext(null);

const CounterContextProvider = ({ children }) => (
  <CounterContext.Provider value={useState(0)}>{children}</CounterContext.Provider>
);

const divStyle = 'border-[1.5px] rounded-md border-zinc-400 p-3';
const buttonStyle = 'rounded bg-blue-500 px-2 py-1 text-white shadow-md hover:bg-blue-600';

const Container = () => (
  <div className={divStyle}>
    <AddOneButton />
  </div>
);

const AddOneButton = () => {
  const [, setCounter] = useContext(CounterContext);
  return (
    <div className={divStyle}>
      <button className={buttonStyle} onClick={() => setCounter((v: number) => v + 1)}>
        Add one
      </button>
    </div>
  );
};

const Counter = () => {
  const [counter] = useContext(CounterContext);
  return <div className={divStyle}>Counter : {counter}</div>;
};

function CounterUseState() {
  // const [counter, setCounter] = useState(0);
  return (
    <div className={`${divStyle} space-y-3`}>
      <CounterContextProvider>
        <Container />
        <Counter />
      </CounterContextProvider>
    </div>
  );
}

export default function CounterUseStatePage() {
  return (
    <LayoutToExperiments title='Counter Context useState' domain='React'>
      <SubTitle>Make a counter using useContext instead pop drilling</SubTitle>
      <div className='space-y-3'>
        <CounterUseState />
        <CounterUseState />
        <CounterUseState />
      </div>
    </LayoutToExperiments>
  );
}
