import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import remarkBreaks from 'remark-breaks';
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.xypnox.com',
  integrations: [solidJs(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkBreaks]
  },
  build: {
    site: 'https://www.xypnox.com',
  }
});
