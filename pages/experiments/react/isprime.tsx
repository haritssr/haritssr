import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useState } from 'react';

// TODO :
// return (with red color font) if the input value is not number, below the input value
// clear the blue result box if input is empty

//DONE
// give result on demand without check button

// Problem
// the result will stale the previous state
// the result fire when the input is empty

export default function IsPrime() {
  const [value, setValue] = useState<null | number>(null);
  const [is, setIs] = useState<undefined | string | null | number>(undefined);
  function isPrimeNumber(i: number | null) {
    return i == 2 ? true : i > 1 && i % 2 !== 0 ? true : false;
  }

  function handleChange(e: { target: { value: any } }) {
    setValue(e.target.value);
    setIs(isPrimeNumber(value) ? 'is a prime number' : 'is not a prime number');
  }

  return (
    <LayoutToExperiments domain='React' title='isPrime'>
      <SubTitle>
        Checking whether the input is prime number or not, currently will not throw an error if the
        input field is not a number (e.g. string).{' '}
        <span className='font-bold'>What is prime number ?. </span>Prime number is number bigger
        than one and can only divide by 1 or itself.
      </SubTitle>

      <div className='flex items-center space-x-4'>
        <label>
          <div>Enter a number</div>
          <input
            type='text'
            placeholder='masukkan angka'
            value={value}
            onChange={handleChange}
            className='mr-2 inline rounded-md border border-zinc-400 px-3 py-1.5 caret-blue-500 focus:outline-none'
          />
        </label>
        <label>
          <div>Result</div>
          <div className='inline-block rounded-md border border-blue-500 px-4 py-2 text-blue-500'>
            {value} {is}
          </div>{' '}
        </label>
      </div>
    </LayoutToExperiments>
  );
}
