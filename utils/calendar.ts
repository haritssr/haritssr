const calendarDatePattern = /^\d{4}-\d{2}-\d{2}$/u;

export function isCalendarDate(value: string): boolean {
  if (!calendarDatePattern.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}
