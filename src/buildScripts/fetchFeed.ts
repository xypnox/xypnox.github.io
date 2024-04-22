import { promises as fs } from 'fs';
import Parser from "rss-parser";

const defaultFeedUrl = 'https://fosstodon.org/@xypnox.rss';

const fetchFeed = async (url: string) => {
  try {
    const parser = new Parser({
      customFields: {
        feed: ['title', 'description', 'link', 'lastBuildDate', 'webfeeds:icon', 'generator'],
        item: ['guid', 'link', 'pubDate', 'description', 'media:content']
      }
    });
    const feed = await parser.parseURL(url);
    console.log('Feed parsed:', JSON.stringify(feed, null, 2));
    // Save as feed.json in /src/data/
    await fs.writeFile('src/data/feed.json', JSON.stringify(feed, null, 2));
  } catch (error) {
    console.error('Error fetching feed:', error);
  }
}


(async () => {
  fetchFeed(defaultFeedUrl);
})();
