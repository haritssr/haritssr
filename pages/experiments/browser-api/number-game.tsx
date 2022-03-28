import { useState } from 'react';
import Link from 'next/link';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function NumberGame() {
  function inputKeyPress(event: { key: string; }) {
    if (event.key === 'Enter') {
      const answer = parseInt(state.response);
      if (state.num1 + state.num2 === answer) {
        setState({
          ...state,
          num1: Math.ceil(Math.random() * 10),
          num2: Math.ceil(Math.random() * 10),
          score: state.score + 1,
          response: '',
          incorrect: false,
        });
      } else {
        setState({
          ...state,
          score: state.score - 1,
          response: '',
          incorrect: true,
        });
      }
    }
  }

  function updateResponse(event: { target: { value: any; }; }) {
    setState({
      ...state,
      response: event.target.value,
    });
  }

  const [state, setState] = useState({
    num1: 1,
    num2: 2,
    response: '',
    score: 0,
    incorrect: false,
  });

  if (state.score === 2) {
    return (
      <LayoutToExperiments title='Number Game' domain='Browser API'>
        <div className='pt-24 text-4xl font-bold text-center text-green-500'>You win!</div>
        {/* kasih kaya vercel kalo selesai bikin domain baru (confetti)*/}

        {/* halaman tidak reload */}
        {/* href harus dikasih ke domain yang on -> haritssr.com/work/number-game */}
        {/* dan halaman akan reload */}
        <Link href='/work/number-game'>
          <a className='flex justify-center mt-5'>
            <div className='inline-block px-4 py-2 mx-auto text-center border rounded-md text-harislab border-harislab hover:bg-blue-50'>
              Play Again
            </div>
          </a>
        </Link>
      </LayoutToExperiments>
    );
  }

  return (
    <LayoutToExperiments title='Number Game' domain='Browser API'>
      <div className='flex flex-col items-center justify-center max-w-xl pt-24 mx-auto'>
        <div className={state.incorrect ? 'incorrect' : ''}>
          {state.num1}+{state.num2}
        </div>
        <input
          className='py-1 pl-2 border border-gray-500 rounded-md focus:outline-none focus:ring-harislab focus:ring-1'
          value={state.response}
          onChange={updateResponse}
          onKeyPress={inputKeyPress}
          autoFocus={true}
          //autoFocus={true} doesn't work
        />
        <div>Score : {state.score}</div>
      </div>
    </LayoutToExperiments>
  );
}
