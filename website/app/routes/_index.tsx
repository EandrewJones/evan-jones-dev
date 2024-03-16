import type { MetaFunction } from "@remix-run/node";
import Aside from "~/components/layout/Aside";
import ProfileInset from "~/components/brand/ProfileInset";

export const meta: MetaFunction = () => {
  return [
    { title: "Evan Jones dot dev" },
    { name: "Evan Jones' Personal Site", content: "<FILL WITH SEO>" },
  ];
};

export default function Index() {
  return (
    <>
      {/* Page Content Here */}

      {/* Aside */}
      <Aside>
        <ProfileInset />
      </Aside>
    </>
  );
}
