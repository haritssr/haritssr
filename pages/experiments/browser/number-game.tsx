import { useState } from 'react';
import Link from 'next/link';
import LayoutToExperiments from '@/components/LayoutToExperiments';

export default function NumberGame() {
  // the state of the game
  const [state, setState] = useState({
    num1: 1,
    num2: 2,
    response: '',
    score: 0,
    incorrect: false,
  });

  
  function inputKeyPress(event: { key: string }) {
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

  function updateResponse(event: { target: { value: any } }) {
    setState({
      ...state,
      response: event.target.value,
    });
  }

  if (state.score === 2) {
    return (
      <LayoutToExperiments title='Number Game' domain='Browser'>
        <div className='pt-24 text-center text-4xl font-bold text-green-500'>You win!</div>
        {/* kasih kaya vercel kalo selesai bikin domain baru (confetti)*/}

        {/* halaman tidak reload */}
        {/* href harus dikasih ke domain yang on -> haritssr.com/work/number-game */}
        {/* dan halaman akan reload */}
        <Link href='/work/number-game'>
          <a className='mt-5 flex justify-center'>
            <div className='mx-auto inline-block rounded-md border border-harislab px-4 py-2 text-center text-harislab hover:bg-blue-50'>
              Play Again
            </div>
          </a>
        </Link>
      </LayoutToExperiments>
    );
  }

  return (
    <LayoutToExperiments title='Number Game' domain='Browser'>
      <div className='mx-auto flex max-w-xl flex-col items-center justify-center pt-24'>
        <div className={state.incorrect ? 'incorrect' : ''}>
          {state.num1}+{state.num2}
        </div>
        <input
          className='rounded-md border border-gray-500 py-1 pl-2 focus:outline-none focus:ring-1 focus:ring-harislab'
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
