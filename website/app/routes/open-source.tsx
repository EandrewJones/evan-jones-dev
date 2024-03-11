import type { MetaFunction } from "@remix-run/node";
import BreadcrumbHeader from "~/components/layout/BreadcrumbHeader";

export const meta: MetaFunction = () => {
  return [
    { title: "Open Source | Evan Jones dot dev" },
    { name: "Evan Jones' Personal Site", content: "Welcome to my brain!" },
  ];
};

export default function OpenSource() {
  return <BreadcrumbHeader />;
}
