"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { requestReservation } from "@/app/actions/reservation";
import {
  Alert,
  Button,
  Dialog,
  Icon,
  SelectField,
  TextField,
} from "@/docs/design/components";
import { londonNow } from "@/lib/london";
import {
  emptyReservation,
  getTimeSlots,
  MAX_PARTY_SIZE,
  type ReservationState,
} from "@/lib/reservation";
import { site } from "@/lib/site";

const LABEL = "Reserve a table";

const initialState: ReservationState = {
  status: "editing",
  errors: {},
};

function ReservationForm({ onDone }: { onDone: () => void }) {
  const [state, formAction, pending] = useActionState(
    requestReservation,
    initialState,
  );
  const [now] = useState(() => new Date());
  const [partySize, setPartySize] = useState(emptyReservation.partySize);
  const [date, setDate] = useState(emptyReservation.date);
  const [time, setTime] = useState(emptyReservation.time);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLButtonElement>(null);

  // After a submission, move focus to what needs attention next.
  useEffect(() => {
    if (state.status === "received") {
      doneRef.current?.focus();
    } else if (Object.keys(state.errors).length > 0) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    }
  }, [state]);

  if (state.status === "received") {
    const { firstName, partySize: party, dateLabel, time: slot } = state;
    return (
      <>
        <Alert tone="success" live title={`Thanks, ${firstName}.`}>
          We’ve got your request for {party} on {dateLabel} at {slot}. We’ll call
          you to confirm.
        </Alert>
        <Button ref={doneRef} variant="secondary" onClick={onDone} className="mt-6">
          Close
        </Button>
      </>
    );
  }

  const { errors } = state;
  const slots = getTimeSlots(date, now);

  function changeDate(next: string) {
    setDate(next);
    // Hours differ by day, so a chosen time may not exist on the new date.
    if (!getTimeSlots(next, now).includes(time)) setTime("");
  }

  // Not <form action>: React resets the form after an action, which would show
  // the first option in the selects while their state held the person's choice.
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(() => formAction(data));
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="flex flex-col gap-5">
      <TextField
        data-autofocus
        label="Name"
        name="name"
        autoComplete="name"
        required
        error={errors.name}
      />
      <TextField
        label="Phone number"
        name="phone"
        type="tel"
        autoComplete="tel"
        hint="We’ll call this number to confirm your table."
        required
        error={errors.phone}
      />
      <SelectField
        label="Party size"
        name="partySize"
        hint={`For more than ${MAX_PARTY_SIZE} people, call us on ${site.phone.display}.`}
        required
        value={partySize}
        onChange={(event) => setPartySize(event.target.value)}
        error={errors.partySize}
      >
        {Array.from({ length: MAX_PARTY_SIZE }, (_, index) => index + 1).map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </SelectField>
      <div className="grid gap-5 sm:grid-cols-2 sm:items-start">
        <TextField
          label="Preferred date"
          name="date"
          type="date"
          min={londonNow(now).date}
          required
          value={date}
          onChange={(event) => changeDate(event.target.value)}
          error={errors.date}
        />
        <SelectField
          label="Preferred time"
          name="time"
          required
          value={time}
          onChange={(event) => setTime(event.target.value)}
          error={errors.time}
        >
          <option value="">
            {!date
              ? "Choose a date first"
              : slots.length > 0
                ? "Choose a time"
                : "No times left"}
          </option>
          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </SelectField>
      </div>
      <Button type="submit" pending={pending} className="self-start">
        {LABEL}
      </Button>
    </form>
  );
}

type ReserveTableProps = {
  variant?: "primary" | "secondary";
  /** Icon-only below sm, so the header fits at 360px. */
  compact?: boolean;
};

/** A button that opens the reservation form. Each instance has its own dialog. */
export function ReserveTable({ variant = "primary", compact = false }: ReserveTableProps) {
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  return (
    <>
      {compact && (
        <Button
          variant={variant}
          size="icon"
          aria-label={LABEL}
          onClick={show}
          className="sm:hidden"
        >
          <Icon name="calendar" />
        </Button>
      )}
      <Button
        variant={variant}
        onClick={show}
        className={compact ? "max-sm:hidden" : undefined}
      >
        {LABEL}
      </Button>
      <Dialog open={open} onClose={hide} title={LABEL}>
        {open && <ReservationForm onDone={hide} />}
      </Dialog>
    </>
  );
}
