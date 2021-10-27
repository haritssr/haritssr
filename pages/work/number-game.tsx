import { useState } from 'react';
import { Title, TitleBack } from '@/components/DesignSystem';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function NumberGame() {
  function inputKeyPress(event) {
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

  function updateResponse(event) {
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

  if (state.score === 10) {
    return (
      <Layout browserTitle='Number Game' description='Number Game'>
        <TitleBack back="showcase" name='Number Game' />
        <div className='pt-24 text-4xl font-bold text-center text-green-500'>You win!</div>
        {/* kasih kaya vercel kalo selesai bikin domain baru */}

        {/* halaman tidak reload */}
        <Link href='https://www.haritssr.vercel.app/showcase/number-game'>
          <a className='flex justify-center mt-5'>
            <div className='inline-block px-4 py-2 mx-auto text-center border rounded-md text-harislab border-harislab hover:bg-blue-50'>
              Play Again
            </div>
          </a>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout browserTitle='Number Game' description='Number Game'>
      <TitleBack back="work" name='Number Game' />
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
    </Layout>
  );
}
