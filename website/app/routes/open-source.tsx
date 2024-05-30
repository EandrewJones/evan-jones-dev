import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";
import { useQuery } from "@sanity/react-loader";
import OpenSourceProjects from "~/components/OpenSourceProjects";
import { loadQuery } from "~/sanity/loader.server";
import { OPEN_SOURCE_QUERY } from "~/sanity/queries";
import type { OpenSourceProject } from "~/sanity/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Open Source | Evan Jones dot dev" },
    {
      name: "keywords",
      content:
        "open source software, user instrumentation, Kubernetes, telemetry, rust, python, bayesian non-parametrics",
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<SanityDocument<OpenSourceProject>[]>(
    OPEN_SOURCE_QUERY
  );

  const tags = new Set<string>();
  for (const project of initial.data) {
    for (const category of project.categories ?? []) {
      tags.add(category.title.replace(/[\u{0080}-\u{FFFF}]/gu, ""));
    }
  }

  return json({
    initial,
    tags: Array.from(tags),
    groqQuery: OPEN_SOURCE_QUERY,
    params,
  });
};

export default function OpenSource() {
  const { initial, groqQuery, params } = useLoaderData<typeof loader>();
  const { data, loading } = useQuery<OpenSourceProject[]>(groqQuery, params, {
    initial,
  });
  return (
    <>
      <p>
        Below are open source projects I've either created myself or contribute
        to on a regular basis. Some, such as Apache Flagon, I maintain as part
        of my day job. Others I contribute to for pleasure.
      </p>
      {data && !loading ? <OpenSourceProjects projects={data} /> : <div>Loading ...</div>}
    </>
  );
}
