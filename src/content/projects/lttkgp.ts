import type { ProjectData } from "./types";

export const LttkgpProject: ProjectData = {
  title: 'LTTKGP',
  slug: 'lttkgp',
  year: '2020',
  description: [
    'LTTKGP webapp provides a way to browse and listen to the songs posted with a better interface and queued playlists.',
  ],
  content: [
    'Listen to this KGP is a facebook group where people share songs they find interesting. While the group works for sharing, it is not that great of a place to listen to what has been shared.',
    'I designed and developed the frontend with React/Typescript from scratch.',
    'It gathers dust these days.'
  ],
  image: '/icons/lttkp.svg',
  tags: ['React', 'Typescript'],
  cover: {
    src: "dark-home.png",
    alt: "LTTKGP",
  },
  images: [
    {
      path: 'dark-home.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'dark-and-mobile.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'dark-menu.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'gallery.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'home.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'player.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'social.png',
      description: ['The landing page of the platform.'],
    },
  ]
}
