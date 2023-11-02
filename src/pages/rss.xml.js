import rss from "@astrojs/rss"
// import { getCollection } from 'astro:content';

export function GET(context) {
  return rss({
    title: "Blag",
    description: "To muse over the words unmusable.",
    site: context.site,
    items: [],
  })
}
