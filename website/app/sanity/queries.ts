import groq from "groq";

export const ABOUT_QUERY = groq`*[_type == "aboutPage"] | order(_createdAt desc)[0]`;
export const HOME_QUERY = groq`*[_type == "homePage"] | order(_createdAt desc)[0]`;
export const OPEN_SOURCE_QUERY = groq`*[_type == "openSourceProject" && defined(slug.current)] {
  _id,
  title,
  description,
  slug,
  mainImage,
  role,
  github,
  organization,
  categories[]->
}
| order(priority asc)`;
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] {
  _id,
  title,
  description,
  slug,
  mainImage,
  categories[]->
}
| order(_createdAt desc)`;
