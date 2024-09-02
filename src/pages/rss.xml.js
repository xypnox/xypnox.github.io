import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = await getCollection("blog");
  return rss({
    title: "Blag",
    description: "To muse over the words unmusable.",
    site: context.site,
    items: blog
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        image: post.data.coverImage,
        link: `/blag/posts/${post.slug}`,
      })),
  });
}
