# Dialog

A modal on the stone surface, for a short task such as a form. Use it only when the person should finish or dismiss the task before going on.

## Usage

```tsx
"use client";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Reserve a table</Button>
<Dialog open={open} onClose={() => setOpen(false)} title="Reserve a table">
  {open && <ReservationForm />}
</Dialog>
```

Render the contents only while open, so they start fresh each time.

## Props

### Dialog

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `open` | `boolean` | Required | Whether it shows |
| `onClose` | `() => void` | Required | Called for Esc and the close button. Set `open` to false |
| `title` | `string` | Required | Visible heading, and the dialog's accessible name |
| `children` | `ReactNode` | Required | Contents |

### DialogPanel

The same layout without modal behaviour, for showing it inline in the style guide. Takes `title`, `titleId`, `onClose` and `children`.

## States and variants

- **Width:** up to 576px, leaving a 16px margin on small screens.
- **Height:** scrolls inside itself when taller than the screen.
- **Backdrop:** `--color-scrim`. Clicking it does nothing, so a stray click can't lose what someone has typed.

## Tokens

`--color-scrim`, `shadow-overlay`, `type-h3`, plus those of the stone `Surface`.

## Accessibility

Built on the native `<dialog>` with `showModal()`, so the browser traps focus, closes on Esc, makes the page behind inert and returns focus to the button that opened it. On opening, focus goes to the element marked `data-autofocus`, or otherwise the close button. The title names the dialog through `aria-labelledby`.

## Rendering

Client, because `showModal()` needs the browser.
