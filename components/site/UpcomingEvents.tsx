import { cacheLife } from "next/cache";
import { getUpcomingEvents } from "@/lib/events";

/**
 * Cached for hours rather than fixed at build time, so the dates move on by
 * themselves without a rebuild.
 */
export async function UpcomingEvents() {
  "use cache";
  cacheLife("hours");

  const events = getUpcomingEvents(new Date(), 4);

  return (
    <ol className="mt-8 divide-y divide-rule border-y border-rule">
      {events.map((event) => (
        <li key={event.key} className="py-5">
          <h3 className="type-h4">{event.title}</h3>
          <p className="mt-1 type-small tabular-nums text-ink">
            <time dateTime={event.date}>{event.dateLabel}</time>, {event.start} to{" "}
            {event.end}
          </p>
          <p className="mt-2 max-w-measure type-small text-ink-muted">
            {event.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
