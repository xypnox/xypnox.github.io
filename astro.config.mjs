import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import remarkBreaks from 'remark-breaks';
import mdx from "@astrojs/mdx";
import Icons from 'unplugin-icons/vite'

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
  vite: {
    plugins: [
      Icons({
        compiler: 'solid',
      }),
    ],
  },
  build: {
    site: 'https://www.xypnox.com',
  }
});
