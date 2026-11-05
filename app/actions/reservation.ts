"use server";

import {
  describeReservation,
  validateReservation,
  type ReservationState,
  type ReservationValues,
} from "@/lib/reservation";

function text(formData: FormData, key: keyof ReservationValues) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function requestReservation(
  _previous: ReservationState,
  formData: FormData,
): Promise<ReservationState> {
  const values: ReservationValues = {
    name: text(formData, "name"),
    phone: text(formData, "phone"),
    partySize: text(formData, "partySize"),
    date: text(formData, "date"),
    time: text(formData, "time"),
  };

  const errors = validateReservation(values, new Date());
  if (Object.keys(errors).length > 0) {
    return { status: "editing", errors };
  }

  // TODO(before launch): deliver this request to the shop, by email or a booking
  // service. NOTHING IS SENT YET, yet the confirmation promises a phone call, so
  // the site must not go live until this is connected.

  return { status: "received", ...describeReservation(values) };
}
