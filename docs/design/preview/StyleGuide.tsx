import type { ReactNode } from "react";
import {
  Accordion,
  Alert,
  BagArt,
  Button,
  ButtonLink,
  Checkbox,
  ChoiceGroup,
  DialogPanel,
  ExternalLink,
  Hero,
  Icon,
  ImageHero,
  Logo,
  LogoMark,
  MenuItem,
  MenuRow,
  PourRule,
  ProductCard,
  ProductCardSkeleton,
  ProofRow,
  QuantityStepper,
  RoastMeter,
  Seal,
  SelectField,
  Surface,
  Tag,
  TastingNotes,
  TextAreaField,
  TextField,
  TextLink,
  type IconName,
  type SurfaceTone,
} from "../components";

const primitives: { name: string; swatches: [string, string][] }[] = [
  {
    name: "Roast",
    swatches: [
      ["950", "#171411"],
      ["900", "#1F1B1A"],
      ["800", "#2B2522"],
      ["700", "#3F3631"],
      ["600", "#5A4F48"],
      ["500", "#6E625A"],
    ],
  },
  {
    name: "Stone",
    swatches: [
      ["500", "#8F867D"],
      ["400", "#A89E95"],
      ["300", "#BAB2A9"],
      ["200", "#D3CDC6"],
      ["100", "#E6E1DB"],
    ],
  },
  {
    name: "Kraft",
    swatches: [
      ["800", "#5F4322"],
      ["700", "#7A5A36"],
      ["500", "#B18758"],
      ["400", "#C49A69"],
    ],
  },
  {
    name: "Gilt and ember",
    swatches: [
      ["Gilt 100", "#F3E4CC"],
      ["Gilt 300", "#E8C7A0"],
      ["Gilt 500", "#D8AC78"],
      ["Ember 400", "#F1B34F"],
    ],
  },
  {
    name: "Patina and ivory",
    swatches: [
      ["Patina 800", "#1F3335"],
      ["Patina 700", "#2B4043"],
      ["Patina 600", "#4A5F62"],
      ["Ivory", "#FBF7EE"],
    ],
  },
];

const typeSpecimens: { style: string; size: string; sample: string; className: string }[] = [
  { style: "type-display", size: "60–120px Gloock", sample: "Roasted Tuesday", className: "type-display" },
  { style: "type-h1", size: "48–72px Gloock", sample: "Coffee for the whole week", className: "type-h1" },
  { style: "type-h2", size: "36–60px Gloock", sample: "Roasts this month", className: "type-h2" },
  { style: "type-h3", size: "24–36px Gloock", sample: "Daybreak blend", className: "type-h3" },
  { style: "type-h4", size: "24px Jost 500", sample: "Delivery and returns", className: "type-h4" },
  { style: "type-signature", size: "36–72px Mr Dafoe", sample: "Yours by Friday", className: "type-signature" },
  { style: "type-lead", size: "21px Jost", sample: "We roast in small batches every Tuesday and post the same week.", className: "type-lead" },
  { style: "type-body", size: "18px Jost", sample: "Choose whole bean or tell us how you brew, and we will grind it to suit your kit before it leaves the roastery.", className: "type-body" },
  { style: "type-small", size: "16px Jost", sample: "Free UK delivery on orders over £30.", className: "type-small" },
  { style: "type-label", size: "16px Jost 500", sample: "Add to bag", className: "type-label" },
  { style: "type-caption", size: "14px Jost", sample: "Roasted on 3 November", className: "type-caption" },
  { style: "type-stamp", size: "13px Jost 500, tracked", sample: "Small batch roasted", className: "type-stamp" },
];

const icons: IconName[] = [
  "bean", "flame", "leaf", "cup", "truck", "bag", "pastry", "lunch", "music", "calendar", "menu", "close",
  "plus", "minus", "check", "chevron", "info", "alert",
];

const grinds = [
  { value: "whole", label: "Whole bean", detail: "Grind at home" },
  { value: "filter", label: "Filter", detail: "V60, Chemex" },
  { value: "press", label: "Cafetière", detail: "Coarse grind" },
  { value: "espresso", label: "Espresso", detail: "Out of stock", disabled: true },
];

function Section({
  id,
  title,
  intro,
  tone = "roast",
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  tone?: SurfaceTone;
  children: ReactNode;
}) {
  return (
    <Surface id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-page">
        <h2 id={`${id}-title`} className="type-h2">
          {title}
        </h2>
        {intro && <p className="mt-3 max-w-measure text-ink-muted">{intro}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </Surface>
  );
}

function Demo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 type-h4">{label}</h3>
      {children}
    </div>
  );
}

export function StyleGuide() {
  return (
    // SiteHeader and SiteFooter come from the app layout that wraps this page.
    <>
      <div>
        <Hero
          lead="This week’s roast"
          title="Roasted Tuesday."
          signature="Yours by Friday."
          body="Small-batch coffee, posted the week it’s roasted. Choose whole bean or tell us how you brew."
          actions={
            <>
              <ButtonLink href="#coffee">Shop coffee</ButtonLink>
              <ButtonLink href="#brew" variant="secondary">
                Read brew guides
              </ButtonLink>
            </>
          }
          visual={<BagArt name="Daybreak" />}
        />
        <Surface as="div" tone="roast" pad="none" className="border-y border-rule px-gutter py-8">
          <ProofRow
            className="mx-auto max-w-page"
            items={[
              { icon: "bean", label: "Single estate" },
              { icon: "flame", label: "Small batch" },
              { icon: "truck", label: "Posted weekly" },
              { icon: "leaf", label: "Fairly paid" },
            ]}
          />
        </Surface>

        <Section
          id="surfaces"
          title="Four surfaces, one set of names"
          intro="Components ask for roles such as ink and action. Each surface answers with values that pass contrast on it, so the same button works anywhere."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {(["roast", "stone", "kraft", "patina"] as const).map((tone) => (
              <Surface key={tone} as="div" tone={tone} pad="tight" className="flex min-h-80 flex-col gap-3">
                <LogoMark size={40} />
                <h3 className="type-h3 capitalize">{tone}</h3>
                <p className="type-small text-ink-muted">Muted text stays readable here.</p>
                <p className="type-small">
                  <TextLink href="#surfaces">Read the roast notes</TextLink>
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Button size="sm">Add to bag</Button>
                  <Button size="sm" variant="secondary">Save</Button>
                </div>
              </Surface>
            ))}
          </div>
        </Section>

        <Section
          id="colour"
          title="Primitive colours"
          intro="Sampled from the references. Components should reach for the semantic roles above, not these."
          tone="stone"
        >
          <div className="grid gap-8">
            {primitives.map((group) => (
              <div key={group.name}>
                <h3 className="mb-2 type-label">{group.name}</h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                  {group.swatches.map(([name, hex]) => (
                    <li key={hex}>
                      <div className="h-20 border border-rule" style={{ backgroundColor: hex }} />
                      <p className="mt-1 type-caption">{name}</p>
                      <p className="mb-3 type-caption text-ink-muted">{hex}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="type" title="Type">
          <div className="grid gap-8">
            {typeSpecimens.map((type) => (
              <div key={type.style} className="grid gap-2 border-t border-rule pt-3 md:grid-cols-[14rem_1fr]">
                <div>
                  <p className="type-label">{type.style}</p>
                  <p className="type-caption text-ink-muted">{type.size}</p>
                </div>
                <p className={`${type.className} max-w-full wrap-break-word`}>{type.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="brand" title="Brand elements" tone="patina">
          <div className="grid items-start gap-12 md:grid-cols-3">
            <Demo label="Logo">
              <Logo />
              <p className="mt-3 type-small text-ink-muted">Placeholder mark until a final logo is drawn.</p>
            </Demo>
            <Demo label="Seal">
              <Seal size={180} tone="patina" />
            </Demo>
            <Demo label="Pour rule">
              <PourRule />
              <h3 className="mt-8 mb-3 type-label">Icons</h3>
              <ul className="flex flex-wrap gap-3">
                {icons.map((name) => (
                  <li key={name}>
                    <Icon name={name} label={name} />
                  </li>
                ))}
              </ul>
            </Demo>
          </div>
        </Section>

        <Section id="actions" title="Actions">
          <div className="grid gap-10 md:grid-cols-2">
            <Demo label="Button">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Add to bag</Button>
                <Button variant="secondary">Save for later</Button>
                <Button variant="quiet">Clear filters</Button>
                <Button size="sm">Small</Button>
                <Button size="icon" variant="secondary" aria-label="Close">
                  <Icon name="close" />
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button disabled>Sold out</Button>
                <Button pending>Adding to bag</Button>
              </div>
            </Demo>
            <Demo label="Links">
              <p className="max-w-measure">
                Read our <TextLink href="#brew">V60 guide</TextLink> or see how the{" "}
                <ExternalLink href="https://example.com">co-op pays its growers</ExternalLink>.
              </p>
            </Demo>
          </div>
        </Section>

        <Section id="forms" title="Forms" tone="stone">
          <form className="grid gap-8 md:grid-cols-2">
            <TextField label="Email" type="email" required placeholder="you@example.com" />
            <TextField
              label="Postcode"
              required
              defaultValue="M1"
              error="Enter a full postcode, such as M1 1AE."
              hint="We use this to work out delivery."
            />
            <SelectField label="Bag size" required defaultValue="250">
              <option value="250">250g</option>
              <option value="1000">1kg</option>
            </SelectField>
            <TextAreaField label="Delivery note" hint="For example, leave with a neighbour." />
            <ChoiceGroup
              className="md:col-span-2"
              legend="Grind"
              name="grind"
              appearance="tiles"
              defaultValue="filter"
              options={grinds}
            />
            <ChoiceGroup
              legend="Delivery"
              name="delivery"
              defaultValue="weekly"
              options={[
                { value: "weekly", label: "Every week" },
                { value: "fortnight", label: "Every two weeks" },
                { value: "once", label: "One-off order" },
              ]}
            />
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-2 type-label">Quantity</p>
                <QuantityStepper itemLabel="bags of Daybreak" />
              </div>
              <Checkbox label="Email me when new coffees land" />
            </div>
          </form>
        </Section>

        <Section id="coffee" title="Roasts this month" tone="roast">
          <div className="grid border border-rule md:grid-cols-2 xl:grid-cols-4 md:divide-x md:divide-rule">
            <ProductCard
              name="Daybreak"
              href="#daybreak"
              origin="House blend, Brazil and Colombia"
              notes={["Milk chocolate", "Hazelnut"]}
              roast={3}
              priceGbp={9.5}
              size="250g"
              image={<BagArt name="Daybreak" />}
              action={<Button size="sm">Add to bag</Button>}
            />
            <ProductCard
              name="Guji Highland"
              href="#guji"
              origin="Single estate, Ethiopia"
              notes={["Bergamot", "Peach", "Black tea"]}
              roast={1}
              priceGbp={12}
              size="250g"
              status="New crop"
              imageTone="kraft"
              image={<BagArt name="Guji Highland" colourway="patina" />}
              action={<Button size="sm">Add to bag</Button>}
            />
            <ProductCard
              name="Long Table"
              href="#long-table"
              origin="Espresso blend, Peru and Sumatra"
              notes={["Dark cocoa", "Molasses"]}
              roast={5}
              priceGbp={10}
              size="250g"
              imageTone="patina"
              image={<BagArt name="Long Table" colourway="kraft" />}
              action={<Button size="sm" variant="secondary" disabled>Sold out</Button>}
            />
            <ProductCardSkeleton />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4">
            <RoastMeter level={1} />
            <RoastMeter level={3} />
            <RoastMeter level={5} />
            <TastingNotes notes={["Plum", "Brown sugar"]} />
            <Tag variant="solid">New crop</Tag>
          </div>
        </Section>

        <Surface as="div" pad="none" className="grid md:grid-cols-2">
          <Surface id="cafe" tone="kraft" aria-labelledby="menu-title">
            <h2 id="menu-title" className="type-h2">Café menu</h2>
            <ul className="mt-8 max-w-xl">
              <MenuRow name="Flat white" priceGbp={3.6} description="Double shot of Daybreak, steamed whole milk." />
              <MenuRow name="Batch brew" priceGbp={3} description="Whichever filter coffee we are enjoying this week." />
              <MenuRow name="Cardamom bun" priceGbp={3.8} marks={["Contains gluten", "Contains milk"]} />
            </ul>
          </Surface>
          <Surface id="help" tone="stone" aria-labelledby="help-title">
            <h2 id="help-title" className="type-h2">Questions</h2>
            <div className="mt-8">
              <Accordion
                exclusiveName="faq"
                defaultOpen={0}
                items={[
                  { title: "When will my coffee arrive?", content: "We roast on Tuesday and post on Wednesday. Most orders arrive by Friday." },
                  { title: "Can I change my grind?", content: "Yes. Update it in your account any time before Monday at noon." },
                  { title: "How do I pause a subscription?", content: "Go to Subscriptions in your account and choose Pause." },
                ]}
              />
            </div>
          </Surface>
        </Surface>

        <Section
          id="shop"
          title="For the shop"
          intro="A photo hero, a menu item with a photo, and a modal for short tasks. The modal is shown here as a static panel."
        >
          <div className="grid gap-12">
            <Demo label="ImageHero">
              <div className="pb-20">
                <ImageHero
                  heading="h2"
                  animate={false}
                  lead="Southend-on-Sea"
                  title="Stay a while."
                  signature="The kettle’s on."
                  body="Speciality coffee, fresh pastries and light lunches."
                  image={{ src: "/images/hero/cafe.webp", alt: "" }}
                  actions={<ButtonLink href="#shop">See the menu</ButtonLink>}
                />
              </div>
            </Demo>
            <Demo label="MenuItem">
              <ul className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
                <MenuItem
                  name="Flat White"
                  priceGbp={3.6}
                  description="Double espresso with silky steamed whole milk."
                  image="/images/menu/flat-white.webp"
                  badge="Popular"
                />
                <MenuItem
                  name="Butter Croissant"
                  priceGbp={3.2}
                  description="Flaky, golden and baked fresh each morning."
                  image="/images/menu/butter-croissant.webp"
                />
              </ul>
            </Demo>
            <Demo label="Dialog">
              <Surface as="div" tone="stone" pad="none" className="max-w-xl">
                <DialogPanel title="Reserve a table">
                  <TextField label="Name" required />
                </DialogPanel>
              </Surface>
            </Demo>
          </div>
        </Section>

        <Section id="feedback" title="Feedback">
          <div className="grid gap-4 md:grid-cols-3">
            <Alert title="Roasting on Tuesday">Order by Monday at noon for this week’s batch.</Alert>
            <Alert tone="success" title="Added to bag">Daybreak, 250g, filter grind.</Alert>
            <Alert tone="danger" title="Payment declined">Check your card details, or try another card.</Alert>
          </div>
        </Section>
      </div>
    </>
  );
}
