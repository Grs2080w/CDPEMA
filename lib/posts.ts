import posts from "./data/posts.json";

export type Post = (typeof posts)[number];
export const allPosts: Post[] = posts;
export const getPost = (slug: string) => allPosts.find((p) => p.slug === slug);
