import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import remarkBreaks from 'remark-breaks';
import mdx from "@astrojs/mdx";

import shikiTheme from "./src/styles/xydark.json";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.xypnox.com',
  integrations: [solidJs(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkBreaks],
    shikiConfig: {
      theme: shikiTheme,
    }
  },
  build: {
    site: 'https://www.xypnox.com',
  }
});
