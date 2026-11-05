import Image from "next/image";
import {
  ButtonLink,
  ImageHero,
  MenuItem,
  ProofRow,
  Surface,
} from "@/docs/design/components";
import { ReserveTable } from "@/components/site/ReserveTable";
import { UpcomingEvents } from "@/components/site/UpcomingEvents";
import { getPopularItems } from "@/lib/menu";

export default function HomePage() {
  return (
    <>
      <ImageHero
        lead="Southend-on-Sea"
        title="Stay a while."
        signature="The kettle’s on."
        body="Speciality coffee, fresh pastries and light lunches, in a corner of Southend that’s easy to settle into."
        image={{
          src: "/images/hero/cafe.webp",
          alt: "A dark café interior lit by warm lamps.",
        }}
        actions={
          <>
            <ReserveTable />
            <ButtonLink href="/menu" variant="secondary">
              See the menu
            </ButtonLink>
          </>
        }
      />

      <Surface as="div" tone="stone" pad="none" className="px-gutter pt-24 pb-10 md:pt-10">
        <ProofRow
          className="mx-auto max-w-page md:pr-48"
          items={[
            { icon: "bean", label: "Speciality coffee" },
            { icon: "pastry", label: "Fresh pastries" },
            { icon: "lunch", label: "Light lunches" },
            { icon: "music", label: "Live on Fridays" },
          ]}
        />
      </Surface>

      <Surface tone="roast" aria-labelledby="popular-title">
        <div className="mx-auto max-w-page">
          <h2 id="popular-title" className="type-h2">
            Most popular
          </h2>
          <ul className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-2">
            {getPopularItems().map((item) => (
              <MenuItem
                key={item.name}
                name={item.name}
                priceGbp={item.priceGbp}
                description={item.description}
                image={item.image}
              />
            ))}
          </ul>
          <ButtonLink href="/menu" variant="secondary" className="mt-10">
            See the full menu
          </ButtonLink>
        </div>
      </Surface>

      <Surface
        id="events"
        tone="patina"
        pad="none"
        aria-labelledby="events-title"
        className="grid md:grid-cols-[3fr_2fr]"
      >
        <div className="px-gutter py-block">
          <h2 id="events-title" className="type-h2">
            Upcoming events
          </h2>
          <p className="mt-4 max-w-measure text-ink-muted">
            An open mic every Friday evening, and a coffee tasting every Saturday
            morning.
          </p>
          <UpcomingEvents />
        </div>
        <div className="relative min-h-80">
          <Image
            src="/images/events/open-mic.webp"
            alt="An acoustic guitar resting on a sofa in low, warm light."
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-right"
          />
        </div>
      </Surface>

      <Surface
        tone="stone"
        pad="none"
        aria-labelledby="founders-title"
        className="grid md:grid-cols-[2fr_3fr]"
      >
        <div className="px-gutter py-block">
          <h2 id="founders-title" className="type-h2">
            Blame a very bad coffee
          </h2>
          <p className="mt-4 max-w-measure">
            We’re Priya and Tom. We met on Saturday shifts in London, promised
            ourselves our own place one day, and finally settled it on a cold walk
            along Southend seafront.
          </p>
          <ButtonLink href="/about" variant="secondary" className="mt-6">
            Read our story
          </ButtonLink>
        </div>
        <div className="relative min-h-80 md:order-first">
          <Image
            src="/images/about/pour.webp"
            alt="Water pouring onto coffee grounds in a paper filter."
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </Surface>
    </>
  );
}
