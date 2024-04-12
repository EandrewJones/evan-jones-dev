import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Research | Evan Jones dot dev" },
    { name: "Evan Jones' Personal Site", content: "Welcome to my brain!" },
  ];
};

export default function Research() {
  return <></>;
}
