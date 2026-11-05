import { readFileSync } from "node:fs";
import path from "node:path";

export const badges = ["Popular", "House Favourite"] as const;
export type Badge = (typeof badges)[number];

export type MenuItem = {
  name: string;
  description: string;
  priceGbp: number;
  badge?: Badge;
  image: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

const COLUMNS = ["category", "name", "description", "price", "badge"];

/** Splits CSV text into rows of fields. Handles quotes, "" escapes and CRLF. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      if (field !== "") throw new Error(`Stray quote in row ${rows.length + 1}`);
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (quoted) throw new Error("Unclosed quote in CSV");
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((cells) => cells.some((cell) => cell !== ""));
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isBadge(value: string): value is Badge {
  return (badges as readonly string[]).includes(value);
}

/** Turns menu CSV text into categories, in file order. Throws on bad rows. */
export function parseMenu(text: string): MenuCategory[] {
  const [header, ...rows] = parseCsv(text.replace(/^﻿/, ""));
  if (header?.join() !== COLUMNS.join()) {
    throw new Error(`Menu CSV header should be: ${COLUMNS.join()}`);
  }

  const categories = new Map<string, MenuCategory>();
  rows.forEach((cells, index) => {
    const where = `menu row ${index + 2}`;
    if (cells.length !== COLUMNS.length) {
      throw new Error(`Expected ${COLUMNS.length} columns in ${where}`);
    }
    const [category, name, description, price, badge] = cells;
    if (!category || !name || !description) {
      throw new Error(`Missing category, name or description in ${where}`);
    }
    if (!/^\d+\.\d{2}$/.test(price)) {
      throw new Error(`Invalid price "${price}" in ${where}`);
    }
    if (badge !== "" && !isBadge(badge)) {
      throw new Error(`Unknown badge "${badge}" in ${where}`);
    }

    const group = categories.get(category) ?? {
      id: slugify(category),
      name: category,
      items: [],
    };
    group.items.push({
      name,
      description,
      priceGbp: Number(price),
      badge: badge === "" ? undefined : badge,
      image: `/images/menu/${slugify(name)}.webp`,
    });
    categories.set(category, group);
  });
  return [...categories.values()];
}

// Read once at module scope: a predictable value, so pages using it prerender.
export const menu = parseMenu(
  readFileSync(path.join(process.cwd(), "docs/menu-items.csv"), "utf8"),
);

export function getPopularItems() {
  return menu
    .flatMap((category) => category.items)
    .filter((item) => item.badge === "Popular");
}
