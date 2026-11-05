/**
 * Calendar helpers for Europe/London. Dates are "YYYY-MM-DD" strings and times
 * are "HH:mm" strings, compared as wall-clock values, so clock changes need no
 * special handling. Safe to import from client code.
 */

const londonClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const longDate = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  weekday: "long",
  day: "numeric",
  month: "long",
});

/** The date and time on a wall clock in London at the given instant. */
export function londonNow(now: Date): { date: string; time: string } {
  const part = Object.fromEntries(
    londonClock.formatToParts(now).map(({ type, value }) => [type, value]),
  );
  return {
    date: `${part.year}-${part.month}-${part.day}`,
    time: `${part.hour}:${part.minute}`,
  };
}

function toUtc(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

/** True only for a real calendar date in YYYY-MM-DD form. */
export function isCalendarDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  return toUtc(date).toISOString().slice(0, 10) === date;
}

export function addDays(date: string, days: number) {
  const next = toUtc(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
}

/** 0 is Sunday, 6 is Saturday. */
export function weekdayOf(date: string) {
  return toUtc(date).getUTCDay();
}

/** "Saturday 14 November" */
export function formatLongDate(date: string) {
  return longDate.format(toUtc(date)).replace(",", "");
}
