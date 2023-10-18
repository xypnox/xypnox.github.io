import rss from "@astrojs/rss"
// import { getCollection } from 'astro:content';

export default function get(context) {
  return rss({
    title: "Blag",
    description: "To muse over the words unmusable.",
    site: context.site,
    items: [],
  })
}
