import groq from "groq";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;
export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
export const HOME_QUERY = groq`*[_type == "homePage"] | order(_createdAt desc)[0]`;
export const ABOUT_QUERY = groq`*[_type == "aboutPage"] | order(_createdAt desc)[0]`;
