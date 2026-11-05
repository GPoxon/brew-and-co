import {
  formatLongDate,
  isCalendarDate,
  londonNow,
  weekdayOf,
} from "./london";
import { openingHours, site } from "./site";

export const MAX_PARTY_SIZE = 8;

/** Last table is taken this long before closing. */
const LAST_SEATING_MINUTES = 60;
const SLOT_MINUTES = 30;

export type ReservationValues = {
  name: string;
  phone: string;
  partySize: string;
  date: string;
  time: string;
};

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>;

export type ReservationState =
  | { status: "editing"; errors: ReservationErrors }
  | {
      status: "received";
      firstName: string;
      partySize: number;
      dateLabel: string;
      time: string;
    };

export const emptyReservation: ReservationValues = {
  name: "",
  phone: "",
  partySize: "2",
  date: "",
  time: "",
};

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function toTime(minutes: number) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  return `${hours}:${String(minutes % 60).padStart(2, "0")}`;
}

/** Bookable times on a date, leaving out any that have passed. */
export function getTimeSlots(date: string, now: Date): string[] {
  if (!isCalendarDate(date)) return [];
  const { open, close } = openingHours[weekdayOf(date)];
  const today = londonNow(now);

  const slots: string[] = [];
  const last = toMinutes(close) - LAST_SEATING_MINUTES;
  for (let minutes = toMinutes(open); minutes <= last; minutes += SLOT_MINUTES) {
    const time = toTime(minutes);
    if (date > today.date || (date === today.date && time > today.time)) {
      slots.push(time);
    }
  }
  return slots;
}

/** Checks a request. Runs on the server, so it must not trust the form. */
export function validateReservation(
  values: ReservationValues,
  now: Date,
): ReservationErrors {
  const errors: ReservationErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Enter your name, so we know who the table is for.";
  } else if (name.length > 100) {
    errors.name = "Enter a name of 100 characters or fewer.";
  }

  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Enter a phone number, so we can confirm your table.";
  } else if (!/^\+?[\d\s()-]+$/.test(phone) || digits.length < 10 || digits.length > 15) {
    errors.phone = `Enter a full phone number, such as ${site.phone.display}.`;
  }

  const partySize = Number(values.partySize);
  if (!Number.isInteger(partySize) || partySize < 1) {
    errors.partySize = "Choose how many people are coming.";
  } else if (partySize > MAX_PARTY_SIZE) {
    errors.partySize = `For more than ${MAX_PARTY_SIZE} people, call us on ${site.phone.display}.`;
  }

  if (!values.date) {
    errors.date = "Choose a date.";
  } else if (!isCalendarDate(values.date)) {
    errors.date = "Enter a real date, such as 14 November.";
  } else if (values.date < londonNow(now).date) {
    errors.date = "That date has passed. Choose today or a later date.";
  }

  if (!errors.date) {
    const slots = getTimeSlots(values.date, now);
    if (!values.time) {
      errors.time = "Choose a time.";
    } else if (!slots.includes(values.time)) {
      errors.time =
        slots.length > 0
          ? `Choose a time between ${slots[0]} and ${slots[slots.length - 1]}.`
          : "There are no times left on that date. Choose a later date.";
    }
  }

  return errors;
}

export function describeReservation(values: ReservationValues) {
  return {
    firstName: values.name.trim().split(/\s+/)[0],
    partySize: Number(values.partySize),
    dateLabel: formatLongDate(values.date),
    time: values.time,
  };
}
