import { addDays, formatLongDate, londonNow, weekdayOf } from "./london";
import { recurringEvents } from "./site";

export type UpcomingEvent = {
  /** Stable across renders: the event id and its date. */
  key: string;
  title: string;
  description: string;
  date: string;
  dateLabel: string;
  start: string;
  end: string;
};

/**
 * The next `count` events in date order, using London time. An event stays
 * listed until it finishes, so tonight's open mic still shows while it's on.
 */
export function getUpcomingEvents(now: Date, count: number): UpcomingEvent[] {
  const today = londonNow(now);
  const upcoming: UpcomingEvent[] = [];

  for (let offset = 0; upcoming.length < count; offset++) {
    const date = addDays(today.date, offset);
    const onThisDay = recurringEvents
      .filter((event) => event.weekday === weekdayOf(date))
      .filter((event) => date > today.date || event.end > today.time)
      .sort((a, b) => a.start.localeCompare(b.start));

    for (const event of onThisDay) {
      upcoming.push({
        key: `${event.id}-${date}`,
        title: event.title,
        description: event.description,
        date,
        dateLabel: formatLongDate(date),
        start: event.start,
        end: event.end,
      });
    }
  }

  return upcoming.slice(0, count);
}
