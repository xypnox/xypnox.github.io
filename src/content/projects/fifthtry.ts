import type { ProjectData } from "./types";

export const FifthtryProject: ProjectData = {
  title: 'Fifthtry',
  slug: 'fifthtry',
  year: '2020',
  description: [
    'A documentation tool that matched code changes with documentation updates.',
  ],
  content: [
    'I interned at fifthry when it was a documentation tool that ensured that no code went live without being updated in the documentation.',
    "I worked on change requests, similar to pull requests, with versioning and diff of a text document.",
    "I also contributed to the data and performance analytics stack that collected details of all function calls made for a request.",
  ],
  image: '/icons/Fifthtry.svg',
  link: 'https://fifthtry.com',
  tags: ['Rust', 'Elm', 'Realm'],
  cover: {
    src: 'prototype.png',
    alt: 'Fifthtry\'s Documentation Tool, Prototype',
  },
  images: [
    {
      path: 'web-home.png',
      description: ['I designed and developed a few landing pages and registration flow.'],
    },
    {
      path: 'web-email-confirm.png',
      description: ['The email confirmation page with similar design to the landing page and a welcoming illustration.'],
    },
    {
      path: 'web-beta-list.png',
      description: ['The admins could browse the list of beta users and send them invites.'],
    },
    {
      path: 'subscribe-mobile.png',
      description: ['We added a subscription feature to the websites.', 'Here is a mobile view for the popup for subscribing to a page or website.'],
    },
    {
      path: 'cr-template.png',
      description: ['We ideated the journey for change requests in Figma.', 'The pages started with a very simple layout.'],
    },
    {
      path: 'editor-prototype.png',
      description: ['CRs were simpler and intuitive versions of github\'s pull requests.', 'We prototyped the entire flow before development.'],
    },
    {
      path: 'cr-ui.png',
      description: ['We prototyped the menus and the diff view for change requests.'],
    },
    {
      path: 'diff-cr-ui.png',
      description: ['The implemented interface for the diff view of change requests resulted in a bit more complex layout.', 'Later syntax highlighting was added to the diffs to make them much more palpable. (not shown here)'],
    },
    {
      path: 'likes-ui.png',
      description: ['I developed several features during the internship.', 'One of them was the likes feature for comments.', 'Shown here is the liked by page for a specific page in the storybook of realm.',],
    },
    {
      path: 'toolbar.png',
      description: [
        'I redesigned the toolbar as the number of features increased.',
        'And the old design was neither scalable nor pretty.'],
    },
    {
      path: 'page-ui-old.png',
      description: ['The interface of a page before I started working on the front of the frontend.'],
    },
    {
      path: 'page-ui.png',
      description: ['The interface of a page after I had finished my first few iterations on the frontend design.'],
    },
    {
      path: 'certificate.png',
      description: ['I even designed the certificate of internship that I was awarded.'],
    },
  ]
}
