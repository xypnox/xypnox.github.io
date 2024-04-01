import type { ProjectData } from "./types";

export const NiraProject: ProjectData = {
  title: 'Nirah',
  slug: 'nirah',
  year: '2023',
  description: [
    'A startup offering enterprise-first secure, reliable, and scalable webhook platform.',
  ],
  content: [
    'I collaborated directly with the founder in a 10 day sprint',
    'We designed and developed the product interfaces, website, blog, docs, brand, illustrations.',
    'With no prior design, the branding and product had to be designed from scratch.',
  ],
  image: '/icons/Nirah.svg',
  link: 'https://nirah.app',
  cover: {
    src: 'web-dark.png',
    alt: 'Nirah Website',
  },
  tags: ['Django', 'HTMX', 'Astro', 'Figma'],
  images: [
    {
      path: 'design-figma.png',
      description: ['We iterated several screens on figma before building them out.']
    },
    {
      path: 'product.png',
      description: ['The product was the key area of focus.', 'It had to be user friendly and modern with a bit of restraint.', 'Some call this enterprisy design.']
    },
    {
      path: 'web-dark-full.png',
      description: ['The website was meant to be minimal and modifiable with code.', 'Several sections were designed and developed from scrath to keep the amount of dependencies minimal.', 'The illustration was made with generative model and annotations were added within Figma.']
    },
    {
      path: 'web-light.png',
      description: ['Both the product and the website had light and dark modes.']
    },
    {
      path: 'docs.png',
      description: ['The documentation was designed to be minimal and easy to navigate.', 'It was simple to implement with content collections in Astro.']
    },
    {
      path: 'blog.png',
      description: ['Blog with tags and authors', 'Posts are minimal straightforward and to the point.']
    },
  ]
}
