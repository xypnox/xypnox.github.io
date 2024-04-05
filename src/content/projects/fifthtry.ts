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
      path: 'editor-prototype.png',
      description: ['The editor of the platform.'],
    },
    {
      path: 'toolbar.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'web-home.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'web-email-confirm.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'web-beta-list.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'certificate.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'cr-ui.png',
      description: ['The interface for change requests.'],
    },
    {
      path: 'cr-template.png',
      description: ['The template for change requests.'],
    },
    {
      path: 'subscribe-mobile.png',
      description: ['The mobile view of a page with subscribe option.'],
    },
    {
      path: 'likes-ui.png',
      description: ['The interface for likes.'],
    },
    {
      path: 'diff-cr-ui.png',
      description: ['The interface for diffing change requests.'],
    },
    {
      path: 'page-ui.png',
      description: ['The interface for the page.'],
    },
    {
      path: 'page-ui-old.png',
      description: ['The old interface for the page.'],
    },
  ]
}
