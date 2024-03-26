import type { ProjectData } from "./types";

export const NiraProject: ProjectData = {
  title: 'Nirah',
  slug: 'nirah',
  year: '2023',
  description: [
    'A startup offering enterprise-first secure, reliable, and scalable webhook platform.',
  ],
  content: [
    'I collaborated with the founder, and in a 10 day sprint, we designed and developed the product interfaces, website, blog, docs, brand, illustrations.',
  ],
  image: '/icons/Nirah.svg',
  link: 'https://nirah.app',
  cover: {
    src: 'web-dark.png',
    alt: 'Nirah Website',
  },
  tags: ['Django', 'HTMX', 'Astro', 'Figma'],
  // /home/xypnox/Projects/x/com/src/assets/projects/nirah/design-figma.png
  // /home/xypnox/Projects/x/com/src/assets/projects/nirah/web-light.png
  // /home/xypnox/Projects/x/com/src/assets/projects/nirah/docs.png
  // /home/xypnox/Projects/x/com/src/assets/projects/nirah/blog.png
  // /home/xypnox/Projects/x/com/src/assets/projects/nirah/web-dark-full.png
  // /home/xypnox/Projects/x/com/src/assets/projects/nirah/web-dark.png
  // /home/xypnox/Projects/x/com/src/assets/projects/nirah/product.png
  images: [
    {
      path: 'web-dark-full.png',
      description: ['The website was designed in dark mode.']
    },
    {
      path: 'web-light.png',
      description: ['The website was designed in light mode.']
    },
    {
      path: 'docs.png',
      description: ['The documentation was designed in dark mode.']
    },
    {
      path: 'blog.png',
      description: ['The blog was designed in dark mode.']
    },
    {
      path: 'design-figma.png',
      description: ['The design was done in Figma.']
    },
    {
      path: 'product.png',
      description: ['The product was designed in dark mode.']
    }
  ]
}
