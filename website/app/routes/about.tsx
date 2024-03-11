import type { MetaFunction } from "@remix-run/node";
import BreadcrumbHeader from "~/components/layout/BreadcrumbHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "About | Evan Jones dot dev" },
    { name: "Evan Jones' Personal Site", content: "Welcome to my brain!" },
  ];
};

export default function About() {
  return <BreadcrumbHeader />;
}
