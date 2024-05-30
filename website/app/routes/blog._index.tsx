import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, useLoaderData, useSearchParams } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";
import { useMemo, useState } from "react";

import Posts from "~/components/Posts";
import CategorySearchAndFilter from "~/components/PostsInset";
import Aside from "~/components/layout/Aside";
import { filterPosts } from "~/lib/utils";
import { useQuery } from "~/sanity/loader";
import { loadQuery } from "~/sanity/loader.server";
import { POSTS_QUERY } from "~/sanity/queries";
import type { PostPreview } from "~/sanity/types";

export const meta: MetaFunction = () => {
  return [
    { title: "Blog | Evan Jones dot dev" },
    // Other meta tags
    {
      name: "keywords",
      content:
        "software engineering, DevSecOps, machine learning, LLMs, programming, professional development, public sector",
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const initial = await loadQuery<SanityDocument<PostPreview>[]>(POSTS_QUERY);

  const tags = new Set<string>();
  for (const post of initial.data) {
    for (const category of post.categories ?? []) {
      tags.add(category.title.replace(/[\u{0080}-\u{FFFF}]/gu, ""));
    }
  }

  return json({
    initial,
    tags: Array.from(tags),
    groqQuery: POSTS_QUERY,
    params,
  });
};

export default function Blog() {
  const { initial, tags, groqQuery, params } = useLoaderData<typeof loader>();
  const { data, loading } = useQuery<PostPreview[]>(
    groqQuery,
    params,
    {
      initial,
    }
  );

  const [searchParams] = useSearchParams();
  const [queryValue, setQuery] = useState<string>(() => {
    return searchParams.get("q") ?? "";
  });
  const query = queryValue.trim();

  const matchingPosts = useMemo(() => {
    return filterPosts(data ?? [], query);
  }, [data, query]);

  function toggleTag(tag: string) {
    setQuery((q) => {
      // create a regexp so that we can replace multiple occurences (`react node react`)
      const expression = new RegExp(tag, "ig");

      const newQuery = expression.test(q)
        ? q.replace(expression, "")
        : `${q} ${tag}`;

      // trim and remove subsequent spaces
      return newQuery.replace(/\s+/g, " ").trim();
    });
  }

  const isSearching = query.length > 0;
  const visibleTags = isSearching
    ? new Set(
        matchingPosts
          .flatMap((post) => post.categories.map((c) => c.title))
          .filter(Boolean)
      )
    : new Set(tags);

  return (
    <>
      <p>
        Topics I commonly like to write about include LLMOps, learning new
        skills, DS{"&"}A, and projects I am working on. Everything else falls
        into a musings bucket.
      </p>
      <p>
        I prefer a published post over a perfect post, so think of them as parts
        of an on-going conversation. Ideas, like code bases, mature through
        continued practice and refactoring.
      </p>
      {data && !loading ? (
        <Posts posts={matchingPosts} />
      ) : (
        <div>Loading ...</div>
      )}
      <Aside>
        <CategorySearchAndFilter
          tags={tags}
          toggleTag={toggleTag}
          queryValue={queryValue}
          setQuery={setQuery}
          searchQuery={query}
          visibleTags={visibleTags}
        />
      </Aside>
    </>
  );
}
