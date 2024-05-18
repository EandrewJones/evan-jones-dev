import { type ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { matchSorter, rankings } from "match-sorter";
import { twMerge } from "tailwind-merge";
import type { SanityDocument } from "@sanity/client";
import type { PostPreview } from "~/sanity/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calendarDate(date: string) {
  return dayjs(date).format("dddd MMMM D, YYYY");
}

export function filterPosts(posts: Array<PostPreview>, searchString: string) {
  if (!searchString) return posts;

  const options = {
    keys: [
      { key: "categories.*.title", threshold: rankings.CONTAINS },
      { key: "description", threshold: rankings.CONTAINS },
      { key: "title", threshold: rankings.CONTAINS },
    ],
  };

  const allResults = matchSorter(posts, searchString, options);
  const searches = new Set(searchString.split(" "));
  if (searches.size < 2) {
    // if there's only one word, we're done
    return allResults;
  }

  // if there are multiple words, we'll conduct an individual search for each word
  const [firstWord, ...restWords] = searches.values();
  if (!firstWord) {
    // this should be impossible, but if it does happen, we'll just return an empty array
    return [];
  }
  const individualWordOptions = {
    ...options,
    keys: options.keys.map((key) => {
      return {
        ...key,
        maxRanking: rankings.CASE_SENSITIVE_EQUAL,
        threshold: rankings.WORD_STARTS_WITH,
      };
    }),
  };

  // go through each word and further filter the results
  let individualWordResults = matchSorter(
    posts,
    firstWord,
    individualWordOptions
  );
  for (const word of restWords) {
    const searchResult = matchSorter(
      individualWordResults,
      word,
      individualWordOptions
    );
    individualWordResults = individualWordResults.filter((r) =>
      searchResult.includes(r)
    );
  }
  return Array.from(new Set([...allResults, ...individualWordResults]));
}

export const textToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export function blocksToText(blocks: any, opts = {}) {
  const defaults = { nonTextBehavior: "remove" };
  const options = Object.assign({}, defaults, opts);
  return blocks
    .map((block: any) => {
      if (block._type !== "block" || !block.children) {
        return options.nonTextBehavior === "remove"
          ? ""
          : `[${block._type} block]`;
      }

      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}
