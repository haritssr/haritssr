import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useReducer, createContext, useContext } from 'react';

//while useState return a state and setter function, useReducer return a value and the dispatch function
//action is object
const reducer = (state: number, action: { type: any }) => {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'substract':
      return state - 1;
    case 'reset':
      return (state = 0);
    default:
      return state;
  }
};

const CounterContext = createContext(null);

const CounterContextProvider = ({ children }) => (
  <CounterContext.Provider value={useReducer(reducer, 0)}>{children}</CounterContext.Provider>
);

const divStyle = 'border-[1.5px] rounded-md border-zinc-400 p-3';
const buttonStyle =
  'px-2 py-1 bg-blue-500 rounded-md shadow-md active:shadow active:ring-2 active:ring-blue-300 duration-100 text-zinc-100 hover:bg-blue-600 border border-blue-500';
const substracButtonStyle =
  'px-2 py-1  bg-white rounded-md shadow-md hover:bg-gray-50 active:shadow duration-100 text-blue-500 active:ring-2 active:ring-blue-300 border border-blue-500';
const ClearButtonStyle =
  'px-2 py-1  bg-white rounded-md shadow-md hover:bg-gray-50 active:shadow duration-100 text-rose-500 active:ring-2 active:ring-rose-300 border border-rose-500';

const ResetButton = () => {
  const [, dispatch] = useContext(CounterContext);
  return (
    <button className={ClearButtonStyle} onClick={() => dispatch({ type: 'reset' })}>
      Reset
    </button>
  );
};
const AddOneButton = () => {
  const [, dispatch] = useContext(CounterContext);
  return (
    <button className={buttonStyle} onClick={() => dispatch({ type: 'add' })}>
      Add one
    </button>
  );
};
const SubstractOneButton = () => {
  const [, dispatch] = useContext(CounterContext);
  return (
    <button className={substracButtonStyle} onClick={() => dispatch({ type: 'substract' })}>
      Substract one
    </button>
  );
};

const Counter = () => {
  const [counter] = useContext(CounterContext);
  return <div className={divStyle}>Counter : {counter}</div>;
};

function CounterUseState() {
  // const [counter, setCounter] = useState(0);
  return (
    <div className={`${divStyle}`}>
      <div className={`${divStyle} space-y-3`}>
        <CounterContextProvider>
          <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
            <AddOneButton />
            <SubstractOneButton />
            <ResetButton />
          </div>
          <Counter />
        </CounterContextProvider>
      </div>
    </div>
  );
}

export default function CounterUseStatePage() {
  return (
    <LayoutToExperiments title='Counter useReducer' domain='React'>
      <SubTitle>
        Using useReducer to reduce the prop drilling and useContext, and adding ability to make a
        other option (substract one, reset) of useState setter function inside useReducer as a
        dispatch
      </SubTitle>
      <div className='space-y-3'>
        <CounterUseState />
        <CounterUseState />
        <CounterUseState />
      </div>
    </LayoutToExperiments>
  );
}
