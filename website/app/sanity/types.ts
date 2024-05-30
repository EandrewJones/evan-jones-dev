import type { SanityDocument } from "@sanity/client";

export type PostPreview = SanityDocument<{
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

enum OSSRole {
  Contributor = "Contributor",
  Committer = "Committer",
  PMC = "PMC",
  AUTHOR = "Author",
}

enum OSSOrg {
  ASF = "Apache Software Foundation",
  CNCF = "Cloud Native Computing Foundation",
  None = "",
}
export type OpenSourceProject = SanityDocument<{
  title: string;
  description: string | null;
  slug: SanityDocument<{ current: string; _type: "slug" }>;
  mainImage: { _type: "image"; asset: any };
  categories: Array<
    SanityDocument<{
      title: string;
    }>
  >;
  role: OSSRole,
  organization: OSSOrg,
}>;
