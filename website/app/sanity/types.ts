import type { SanityDocument } from "@sanity/client";

export type Post = SanityDocument<{
  title: string;
  description: string | null;
  slug: SanityDocument<{ current: string; _type: "slug" }>;
  mainImage: { _type: "image"; asset: any };
  categories: Array<
    SanityDocument<{
      title: string;
    }>
  >;
  publishedAt: string;
}>;
