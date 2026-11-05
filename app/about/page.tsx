import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, PourRule, Surface } from "@/docs/design/components";
import { ReserveTable } from "@/components/site/ReserveTable";
import { openingHoursSummary, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "How Priya and Tom came to open Brew & Co., a neighbourhood coffee shop in Southend-on-Sea.",
};

// PLACEHOLDER: Priya, Tom and this story are invented. Customers will read them
// as true, so replace them with the real founders' story before launch.

const values = [
  {
    title: "Coffee made with care",
    body: "We’d rather make you one good flat white than talk about it. If you’re curious, ask. If you just want a coffee, that’s fine too.",
  },
  {
    title: "Food we want to eat",
    body: "Pastries, toasties and sandwiches that are a proper reason to stop, whether that’s for ten minutes or for lunch.",
  },
  {
    title: "A room with people in it",
    body: "The best part of a coffee shop is who you end up next to. Stay as long as you like, and come back on Friday.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Surface
        as="div"
        tone="roast"
        pad="none"
        className="grid md:grid-cols-[3fr_2fr]"
      >
        <div className="px-gutter py-block">
          <h1 className="type-h1">It started with a very bad coffee</h1>
          <PourRule animate className="mt-6" />
          <p className="mt-8 max-w-measure type-lead">
            We’re Priya and Tom, and Brew &amp; Co. is our neighbourhood coffee
            shop in Southend-on-Sea. Here’s how a cold morning and a disappointing
            cup got us here.
          </p>
        </div>
        <div className="relative min-h-80">
          <Image
            src="/images/about/table.webp"
            alt="A wooden table and chair in low, warm sunlight."
            fill
            preload
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </Surface>

      <Surface
        tone="stone"
        pad="none"
        aria-labelledby="began-title"
        className="grid md:grid-cols-[2fr_3fr]"
      >
        <div className="px-gutter py-block">
          <h2 id="began-title" className="type-h2">
            How it began
          </h2>
          <div className="mt-8 flex max-w-measure flex-col gap-5">
            <p>
              We met on Saturday shifts at a café in London. Between the morning
              rush and the afternoon lull, we spent years promising each other
              “our own place one day”, without doing much about it.
            </p>
            <p>
              Then came a walk along Southend seafront on a cold morning, and a
              very bad coffee to warm us up. Neither of us finished it. By the time
              we reached the car, “one day” had started to sound like “this year”.
            </p>
            <p>
              We took on an empty corner unit and sanded the counter ourselves,
              badly at first. The Friday open mic wasn’t part of the plan. It began
              when a regular brought a guitar in, and nobody wanted them to stop.
            </p>
          </div>
        </div>
        <div className="relative min-h-80">
          <Image
            src="/images/about/pour.webp"
            alt="Water pouring onto coffee grounds in a paper filter."
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
      </Surface>

      <Surface tone="kraft" aria-labelledby="care-title">
        <div className="mx-auto max-w-page">
          <h2 id="care-title" className="type-h2">
            What we care about
          </h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12">
            {values.map((value) => (
              <li key={value.title}>
                <h3 className="type-h4">{value.title}</h3>
                <p className="mt-2 max-w-measure">{value.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Surface>

      <Surface
        tone="patina"
        pad="none"
        aria-labelledby="visit-title"
        className="grid md:grid-cols-[2fr_3fr]"
      >
        <div className="relative min-h-80">
          <Image
            src="/images/about/hands.webp"
            alt="Hands pouring coffee from a glass jug into a white mug."
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="px-gutter py-block">
          <h2 id="visit-title" className="type-h2">
            Come and say hello
          </h2>
          <p className="mt-4 max-w-measure">
            You’ll find us at {site.address.join(", ")}. Pull up a chair, or book
            ahead if you’re coming as a group.
          </p>
          <dl className="mt-6 type-small">
            {openingHoursSummary.map(({ days, hours }) => (
              <div key={days} className="flex flex-wrap gap-x-2">
                <dt>{days}</dt>
                <dd className="text-ink-muted tabular-nums">{hours}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            <ReserveTable />
            <ButtonLink href="/menu" variant="secondary">
              See the menu
            </ButtonLink>
          </div>
        </div>
      </Surface>
    </>
  );
}
