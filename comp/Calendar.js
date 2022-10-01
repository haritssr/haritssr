import { useRef } from 'react';
import { useCalendarState } from '@react-stately/calendar';
import { useCalendar } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { createCalendar } from '@internationalized/date';
import { CalendarGrid } from './CalendarGrid';
import { CalendarHeader } from './CalendarHeader';

export default function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(props, state, ref);

  return (
    <div {...calendarProps} ref={ref} className='inline-block w-full text-gray-800'>
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
        <CalendarGrid state={state} />
        <CalendarGrid state={state} offset={{ months: 1 }} />
      </div>
    </div>
  );
}
