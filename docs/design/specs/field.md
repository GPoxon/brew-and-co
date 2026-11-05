# TextField, TextAreaField and SelectField

Native form controls with their label, hint and error built in.

## Usage

```tsx
<TextField
  label="Postcode"
  name="postcode"
  required
  hint="We use this to work out delivery."
  error={state.errors?.postcode}
/>

<SelectField label="Bag size" name="size" required defaultValue="250">
  <option value="250">250g</option>
</SelectField>
```

## Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `label` | `string` | Required | Always visible |
| `hint` | `string` | | Help shown before typing |
| `error` | `string` | | What went wrong and how to fix it |
| `required` | `boolean` | `false` | Fields without it show "Optional" |
| Others | Props of `input`, `textarea` or `select` | | Passed through |

## States and variants

| State | Treatment |
|---|---|
| Rest | `border-control`, `bg-raised` |
| Hover | `border-ink` |
| Focus | 2px `outline-focus` |
| Error | 2px `border-danger`, plus an icon and message below |
| Disabled | 50% opacity |

Inputs and selects are 48px tall. Error messages say how to fix the problem: "Enter a full postcode, such as M1 1AE."

## Tokens

`border-control`, `bg-raised`, `text-ink`, `text-ink-muted`, `border-danger`, `text-danger`, `rounded-control`, `type-label`, `type-caption`.

## Accessibility

Labels are tied to controls. Hints and errors connect through `aria-describedby`, and errors set `aria-invalid`. Placeholder text must not replace a label.

## Rendering

Server, with `useId`. Works with React 19 form actions and `useActionState`. Controlled use with `onChange` needs a client parent.
