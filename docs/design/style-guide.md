# Style guide

Brew & Co. should feel like picking up a well-made bag of coffee: colour-blocked paper, foil line-work and a confident name. Warmth comes from the words and photographs, not from decoration.

## What we took from the references

The references belong to other roasters. We borrow their approach, not their marks, names or copy.

| Reference | What we kept | How it appears here |
|---|---|---|
| `1.png` café poster | Heavy serif headline with a script line and a rising stroke | `Hero`, `type-signature`, `PourRule` |
| `1.png` | Four icons split by thin rules | `ProofRow` |
| `1.png` | Painted door, low sun | Patina surface, ember accent, photo direction |
| `2.png` brand board | Warm black with gilt line-art | Roast surface, `LogoMark` |
| `2.png` | Kraft and stone panels on the bag | Surfaces, `BagArt` |
| `2.png` | A round seal laid across a seam between panels | `Seal`, `SealOnSeam` |

Colour values were sampled from the images, then adjusted where contrast required it.

## Five rules

1. **Blocks touch.** Sections and cards butt together like panels on a bag. Use a gap only inside a block.
2. **One seal on one seam.** The seal across a block edge is the signature move. Use it once per page.
3. **Gold is a line.** Gilt is for strokes and small type, and never fills a shape. Kraft is the only accent that fills.
4. **Roles, not colours.** Components ask for `ink` or `action`, and the surface supplies the value.
5. **Signature once.** One script line per view, and never the only place a fact appears.

## Colour

Choose a surface for each block, then let the tokens follow it.

| Surface | Use for | Limit |
|---|---|---|
| Roast | Page default, heroes, product lists | None |
| Stone | Forms, reading, FAQs. Our light surface, cool rather than cream | None |
| Kraft | One moment of warmth, such as the café menu | One block per view |
| Patina | Seasonal or special features | One block per page |

- Put different surfaces next to each other to create a seam. Two blocks of the same surface read as one.
- Ivory is for text on dark surfaces and for bag labels. Do not use it as a page background.
- Ember is for the signature line and focus ring only.
- Status colours are identical on kraft, so `Alert` always pairs tone with an icon and a title. Never signal status by colour alone.

## Type

| Face | Role | Why |
|---|---|---|
| **Gloock** | Headlines, product names, logo | Heavy and high contrast, like the poster headline |
| **Jost** | Body, UI, stamps | Geometric, like the type on the bag |
| **Mr Dafoe** | Signature line only | A brush script with the same energy as the poster |

Use the `type-*` utilities rather than setting size and font separately. See [tokens.md](tokens.md#type).

- **Tracked capitals are for packaging-style marks:** `type-stamp` in the seal, `ProofRow` and the line leading into a hero. Do not put them above every heading, and do not use them for buttons, labels or navigation.
- **Line length:** body text stops at `max-w-measure`, about 70 characters.
- **Alignment:** left, except `ProofRow` items, which centre under their icons.
- **Apostrophes in Gloock:** large tracked sizes can collide, as in "month's". Check them, and reword if needed.
- **Numbers:** use `tabular-nums` where prices or quantities stack.

## Layout

```text
+--------------------------+----------------+
|  ROAST                   |  STONE         |
|  Lead line               |                |
|  Headline              ( seal )   visual  |
|  Signature line          |                |
|  ---- pour rule          |                |
|  Copy, actions           |                |
+--------------------------+----------------+
|  proof  |  proof  |  proof  |  proof      |
+-------------------------------------------+
```

- Page margin is `px-gutter`, vertical rhythm is `py-block`, and content width is `max-w-page`. `Surface` applies the gutter and rhythm for you.
- Keep Tailwind's default breakpoints. Layouts stack below `md`, and the seal moves to the top edge of the block below it.
- Corners are square on blocks, 2px on controls, and round on seals only.
- Blocks stay flat. Only things floating over the page, such as the mobile menu, use `shadow-overlay`.

## Imagery

The site currently uses stock photography, listed in `docs/image-credits.csv`, until the shop has its own. When commissioning or choosing images:

- **Café and lifestyle:** low side light, worn wood, speckled stoneware, real steam. Dark surroundings with one warm light source.
- **Product:** bags on stone or dark plinths with hard, directional light.
- **Avoid:** latte-art close-ups, bright white backgrounds, laptops in cafés, and photos of people posing with cups.

Line icons use `Icon` at 1.5px stroke with round joins. Add new ones on the same 24px grid.

## Motion

- **One moment:** the pour line draws itself once when the first hero loads.
- **Everything else answers an action:** colour changes on hover (120ms) and the accordion chevron turning (240ms).
- **Loading:** a slow fade on `Skeleton` and pending buttons.
- **No scroll-triggered entrances** and no lifting cards on hover.
- `prefers-reduced-motion` is handled in `tokens.css`, so no component needs its own check.

## Accessibility

- Text meets WCAG AA on every surface, and controls and focus rings meet 3:1. Measurements are in [tokens.md](tokens.md#contrast).
- Keep touch targets at 44px or more. The small button is 40px, so use it only inside dense product layouts.
- Every input has a visible label. Fields are marked "Optional" rather than marking required ones with an asterisk.
- Decorative graphics are hidden from screen readers. Anything carrying meaning has a text alternative.

## Voice

Plain, specific and unhurried. Name the actual thing, and let facts do the selling.

| Instead of | Write |
|---|---|
| Exceptional coffee, thoughtfully crafted | Roasted Tuesday. Yours by Friday. |
| Submit | Add to bag |
| Something went wrong | Payment declined. Check your card details, or try another card. |
| Oops! Nothing here yet | Your bag is empty. Shop coffee |

- Use sentence case and British English.
- Keep an action's name consistent: "Add to bag" leads to "Added to bag".
- Errors say what happened and how to fix it, and don't apologise.
- Only make claims the business can back up, particularly in `ProofRow`.

All product names, prices and delivery promises in the style guide are sample content.

## Do not

- Do not use the deer, the sunrise mark, or any wording from the reference images.
- Do not float rounded cards with soft shadows on a background.
- Do not put gilt gradients on buttons or large areas.
- Do not add a monospace font or a fourth typeface.
- Do not use arbitrary values such as `bg-[#123456]`. Add a token instead, and check its contrast.
