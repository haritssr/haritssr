import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import { useEffect, useState } from 'react';

export default function ClockDemo() {
  return (
    <LayoutToExperiments title='Clock' domain='Browser API'>
      <SubTitle>Clock using new Date(), useEffect(), useInterval(), cleanInterval()</SubTitle>
      <Clock />
    </LayoutToExperiments>
  );
}

//this component just displays the time when it is rendered on screen. After that nothing happens. The time is not updated.

/*
What does it mean to update the time ?
In modern frameworks updating text on the screen means changing the associated state data.
*/
function Clock() {
  const [date, setData] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setData(new Date()), 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className='w-full rounded-md border border-zinc-500 px-4 py-2 text-center text-4xl sm:w-1/3'>
      {date.toLocaleTimeString()}
    </div>
  );
}

/*
--KEY NOTES--
The Date constructor (new Date()) function builds objects storing the current date and time.
The toLocaleTimeString method returns a localized string representation of the time portion of the date.
The useState hook allows us to add the current date as state into a function component.
The setInterval utility creates a timer running the given callback function at the specified intervals.
The useEffect hook lets us running effects in function components. By sending an empty array as the second argument to useEffect we can start the timer only once not at every rerender.
*/
