import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useEffect, useState } from 'react';

export default function UseEffect() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `${count > 0 ? `Clicked = ${count} times` : 'Please click the button'}`;
  });

  return (
    <LayoutToExperiments title='useEffect' domain='React'>
      <SubTitle>Count = {count}</SubTitle>
      <div className='space-x-2'>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(count - 1)}>-1</button>
        <button onClick={() => setCount(0)}>reset</button>
      </div>
    </LayoutToExperiments>
  );
}
