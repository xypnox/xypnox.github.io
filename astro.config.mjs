import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import remarkBreaks from 'remark-breaks';
import rehypeMermaid from 'rehype-mermaid';
import rehypeShiki from '@shikijs/rehype'
import mdx from "@astrojs/mdx";

import shikiTheme from "./src/styles/xydark.json";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.xypnox.com',
  integrations: [solidJs(), mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkBreaks],
    rehypePlugins: [
      rehypeMermaid,
      [rehypeShiki, {
        theme: shikiTheme,
      }] ],
    syntaxHighlight: false,
  },
  build: {
    site: 'https://www.xypnox.com',
  }
});
