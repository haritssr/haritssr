import { useCalendarGrid } from "@react-aria/calendar";
import { getWeeksInMonth, endOfMonth } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { CalendarCell } from "./CalendarCell";

export function CalendarGrid({ state, offset = {} }) {
	const { locale } = useLocale();
	const startDate = state.visibleRange.start.add(offset);
	const endDate = endOfMonth(startDate);
	const { gridProps, headerProps, weekDays } = useCalendarGrid(
		{
			startDate,
			endDate,
		},
		state,
	);

	// Get the number of weeks in the month so we can render the proper number of rows.
	const weeksInMonth = getWeeksInMonth(startDate, locale);

	return (
		<table {...gridProps} cellPadding="0" className="flex-1">
			<thead {...headerProps} className="text-gray-600">
				<tr>
					{weekDays.map((day) => (
						<th key={day}>{day}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{[...new Array(weeksInMonth).keys()].map((weekIndex) => (
					<tr key={weekIndex}>
						{state.getDatesInWeek(weekIndex, startDate).map((date) =>
							// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
							date ? (
								<CalendarCell
									key={date}
									state={state}
									date={date}
									currentMonth={startDate}
								/>
							) : (
								<td key={date} />
							),
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
}
