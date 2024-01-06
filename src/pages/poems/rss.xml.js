import rss from "@astrojs/rss"
import { getCollection } from 'astro:content';

export async function GET(context) {
  const poems = await getCollection('poems');
  return rss({
    title: "Poems",
    description: "A collection of poems by xypnox.",
    site: context.site + "/poems",
    items: poems
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
      .map((poem) => ({
        title: poem.data.title,
        pubDate: poem.data.date,
        link: `/poems/${poem.slug}`,
      })),
  })
}
