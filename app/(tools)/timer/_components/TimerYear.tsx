import { calendarDateLabel, monthCells } from "../utils/timerCalendar";

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

/** Twelve Monday-first mini calendars; selecting a month opens Month. */
export default function TimerYear({
  year,
  today,
  onSelect,
}: {
  year: string;
  today: string;
  onSelect: (month: string) => void;
}) {
  const months = Array.from(
    { length: 12 },
    (_, index) => `${year}-${String(index + 1).padStart(2, "0")}`
  );
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 select-none sm:grid-cols-3 lg:grid-cols-4">
      {months.map((month) => (
        <YearMonth
          key={month}
          month={month}
          today={today}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function YearMonth({
  month,
  today,
  onSelect,
}: {
  month: string;
  today: string;
  onSelect: (month: string) => void;
}) {
  const current = today.startsWith(month);
  const name = calendarDateLabel(`${month}-01`, true);
  return (
    <button
      type="button"
      aria-label={`${name}${current ? ", current month" : ""}`}
      aria-current={current ? "date" : undefined}
      onClick={() => {
        onSelect(month);
      }}
      className="focus-visible:outline-action hover:bg-interface-hover flex min-w-0 cursor-pointer flex-col gap-1 rounded-md p-1 text-left outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2"
    >
      <span
        className={`text-base font-semibold ${current ? "text-danger" : "text-foreground"}`}
      >
        {name.split(" ")[0]?.slice(0, 3)}
      </span>
      <span
        aria-hidden="true"
        className="grid w-full grid-cols-7 text-center text-xs leading-5 tabular-nums"
      >
        {weekdays.map((day, index) => (
          <span key={index} className="text-muted">
            {day}
          </span>
        ))}
        {monthCells(month).map((date, index) =>
          date === null ? (
            <span key={`empty-${index}`} />
          ) : (
            <span
              key={date}
              className={`mx-auto flex size-5 items-center justify-center rounded-full ${date === today ? "bg-danger font-semibold text-white" : "text-foreground"}`}
            >
              {Number(date.slice(8))}
            </span>
          )
        )}
      </span>
    </button>
  );
}
