import { Gloock, Jost, Mr_Dafoe } from "next/font/google";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const dafoe = Mr_Dafoe({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dafoe",
});

/** Put on <html> in app/layout.tsx. tokens.css reads these variables. */
export const fontVariables = `${gloock.variable} ${jost.variable} ${dafoe.variable}`;
