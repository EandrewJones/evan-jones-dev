import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";
import CustomPortableText from "~/components/CustomPortableText";
import ProfileInset from "~/components/ProfileInset";
import Aside from "~/components/layout/Aside";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { ABOUT_QUERY } from "~/sanity/queries";

export const meta: MetaFunction = () => {
  return [
    { title: "About | Evan Jones dot dev" },
    { name: "Evan Jones' Personal Site", content: "Welcome to my brain!" },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<SanityDocument>(ABOUT_QUERY, params);

  return { initial, query: ABOUT_QUERY, params };
};

export default function About() {
  const { initial, query, params } = useLoaderData<typeof loader>();
  const { data, loading } = useQuery<typeof initial.data>(query, params, {
    initial,
  });

  return (
    <>
      {/* Page Content Here */}
      {loading && !data ? (
        "Loading..."
      ) : data ? (
        <CustomPortableText content={data.body} />
      ) : null}
      {/* Aside */}
      <Aside>
        <ProfileInset />
      </Aside>
    </>
  );
}
