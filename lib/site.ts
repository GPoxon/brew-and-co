/**
 * Facts about the shop, in one place.
 *
 * PLACEHOLDERS: the address, phone number, opening hours and event times are
 * not real yet. Confirm them all before launch. The phone number is in Ofcom's
 * range reserved for fiction, so it cannot ring anyone.
 */

export const site = {
  name: "Brew & Co.",
  description:
    "A neighbourhood coffee shop in Southend-on-Sea, serving speciality coffee, fresh pastries and light lunches.",
  address: ["1 Example Parade", "Southend-on-Sea", "SS1 0AA"],
  phone: { display: "01632 960123", href: "tel:+441632960123" },
};

/** Opening and closing times by weekday. 0 is Sunday, 6 is Saturday. */
export const openingHours: Record<number, { open: string; close: string }> = {
  0: { open: "09:00", close: "16:00" },
  1: { open: "07:30", close: "17:00" },
  2: { open: "07:30", close: "17:00" },
  3: { open: "07:30", close: "17:00" },
  4: { open: "07:30", close: "17:00" },
  5: { open: "07:30", close: "22:00" },
  6: { open: "08:30", close: "17:00" },
};

/** The same hours, written out for reading. Keep in step with openingHours. */
export const openingHoursSummary = [
  { days: "Monday to Thursday", hours: "07:30 to 17:00" },
  { days: "Friday", hours: "07:30 to 22:00" },
  { days: "Saturday", hours: "08:30 to 17:00" },
  { days: "Sunday", hours: "09:00 to 16:00" },
];

export const recurringEvents = [
  {
    id: "open-mic",
    title: "Open mic",
    weekday: 5,
    start: "19:00",
    end: "21:30",
    description:
      "Songs, poems and the occasional brave first-timer. Come to play, or just to listen.",
  },
  {
    id: "tasting",
    title: "Coffee tasting",
    weekday: 6,
    start: "10:00",
    end: "11:30",
    description:
      "Try a few coffees side by side and talk through what you notice. No experience needed.",
  },
];

export const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/#events", label: "Events" },
  { href: "/about", label: "About us" },
];
