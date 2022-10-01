import { useCalendarGrid } from '@react-aria/calendar';
import { getWeeksInMonth, endOfMonth } from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import { CalendarCell } from './CalendarCell';

export function CalendarGrid({ state, offset = {} }) {
  let { locale } = useLocale();
  let startDate = state.visibleRange.start.add(offset);
  let endDate = endOfMonth(startDate);
  let { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state
  );

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(startDate, locale);

  return (
    <table {...gridProps} cellPadding='0' className='flex-1'>
      <thead {...headerProps} className='text-gray-600'>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map(weekIndex => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} currentMonth={startDate} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
