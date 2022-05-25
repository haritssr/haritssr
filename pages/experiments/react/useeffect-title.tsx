import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useEffect, useState } from 'react';

export default function UseEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  let buttonStyle =
    'rounded bg-zinc-200 hover:bg-zinc-300 text-zinc-700 px-4 py-1.5 text-sm border-zinc-400 border';

  return (
    <LayoutToExperiments title='useEffect' domain='React'>
      <SubTitle>Count = {count}</SubTitle>
      <div className='space-x-2'>
        <button onClick={() => setCount(count + 1)} className={buttonStyle}>
          Add 1
        </button>
        <button onClick={() => setCount(count - 1)} className={buttonStyle}>
          Substract 1
        </button>
        <button onClick={() => setCount(0)} className={buttonStyle}>
          Reset to 0
        </button>
      </div>
    </LayoutToExperiments>
  );
}
