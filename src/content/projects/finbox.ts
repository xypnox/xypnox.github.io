import type { ProjectData } from "./types";

export const FinboxProject: ProjectData = {
  title: 'Finbox',
  slug: 'finbox',
  description: [
    'Finbox is a fintech company that allows you to embed lending infratstructure in your application.',
  ],
  content: [
    'I worked on the landing page and the entire website from scratch. Using react-static, I generated static pages with SPA navigation.',
    'I also organized Design Sprints to target specific audiences',
    'Started from scratch with UI/UX to develop a unique brand identity for the company. Made personalized icons. illustrations, animations, etc.',
    'This was my first opportunity to design and build a decently sized website.'
  ],
  image: '/icons/finbox.svg',
  link: 'https://finbox.in',
  tags: ['React Static'],
  /*
   
illus.png
wireframes-web.png
hero-illus.png
ui-system.png
about-web.png
contact-web.png
blog-post-web.png
product-page-web.png
gallery-web.jpg
dev-section-web.png
features-web.png
hero-web.png
enterprise-web.png
mobile-web-article.png
blog-web-large.png
blog-web-mobile.png
   */
  cover: {
    src: 'hero-web.png',
    alt: 'Finbox\'s Landing Page',
  },
  images: [
    {
      path: 'gallery-web.jpg',
      description: ['The website contained several bespoke components that I had to structure and develop from scratch.', 'The image gallery is one such example, with the tricky part being making it responsive.'],
    },
    {
      path: 'dev-section-web.png',
      description: ['The developer section caters to developers (duh!).', 'It has the same style as the rest of the website but incorporates a developer terminal to showcase the features.'],
    },
    {
      path: 'features-web.png',
      description: ['The features section is a standard icon title description grid, sometimes displayed as cards, but here has been stripped down to the bare minimum.'],
    },
    {
      path: 'enterprise-web.png',
      description: ['The enterprise section highlights information about certifications and large eneterprise customers.'],
    },
    {
      path: 'illus.png',
      description: ['I also designed most of the illustrations including this isometric hero illustration which I made in Figma.'],
    },
    {
      path: 'hero-illus.png',
      description: ['There were several illustrations made that were not used in the final version.'],
    },
    {
      path: 'wireframes-web.png',
      description: ['We worked with the wireframes first to ideate over the structure and layout of the website.'],
    },
    {
      path: 'ui-system.png',
      description: ['The colors and typography were chosen to depict a serious modern fintech startup.'],
    },
    {
      path: 'about-web.png',
      description: ['I created several accompanying pages like the about page.', 'They usually carried the same style but had different layouts.'],
    },
    {
      path: 'contact-web.png',
      description: ['The contact page was designed specifically to avoid the usual bland form.', 'It is still there, but housed in a quite pleasing layout.'],
    },
    {
      path: 'product-page-web.png',
      description: ['A product page highlights the features of a specific product.', 'It is usually similar to the homepage but a bit more focused.'],
    },
    {
      path: 'mobile-web-article.png',
      description: ['A mobile article page prototype with an enticing cover image.'],
    },
    {
      path: 'blog-post-web.png',
      description: ['A blog post page with a bit of content.', 'The typography of the blog posts was chosen to be serif intentionally.']
    },
    {
      path: 'blog-web-large.png',
      description: ['A blog post displayed on a large screen.', 'It utilizes the whitespaces evenly and is balanced throughout.'],
    },
    {
      path: 'blog-web-mobile.png',
      description: ['The same post transforms to the slender screen of mobiles.', 'Here the small mistake of extra horizontal padding in the title and context can be noticed.', 'For I had not gained expertise in design back then.']
    },
  ],
}
