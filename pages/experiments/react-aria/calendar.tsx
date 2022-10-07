import { SubTitle } from '@/components/DesignSystem';
import LayoutToExperiments from '@/components/LayoutToExperiments';
import Calendar from '../../../utils/react-aria/Calendar.js';
import { today, getLocalTimeZone } from '@internationalized/date';

export default function CalendarC() {
  return (
    <LayoutToExperiments domain='React Aria' title='Calendar'>
      <SubTitle>
        <p className='text-gray-700'>
          Examples of{' '}
          <strong>
            <code>Calendar</code>
          </strong>
          , and{' '}
          <strong>
            <code>RangeCalendar</code>
          </strong>{' '}
          components built with{' '}
          <a
            href='https://react-spectrum.adobe.com/react-aria/'
            rel='noreferrer'
            target='_blank'
            className='text-blue-700 underline'
          >
            React Aria
          </a>{' '}
          and{' '}
          <a
            href='http://tailwindcss.com/'
            rel='noreferrer'
            target='_blank'
            className='text-blue-700 underline'
          >
            Tailwind CSS
          </a>
          .
        </p>
      </SubTitle>
      <div className='flex max-w-xl flex-col items-center'>
        <Calendar minValue={today(getLocalTimeZone())} defaultValue={today(getLocalTimeZone())} />
      </div>
    </LayoutToExperiments>
  );
}
