import type { ProjectData } from "./types";

export const LttkgpProject: ProjectData = {
  title: 'LTTKGP',
  slug: 'lttkgp',
  year: '2020',
  description: [
    'LTTKGP webapp provided a way to browse and listen to the songs posted with a better interface and queued playlists.',
  ],
  content: [
    'Listen to this KGP is a facebook group where people share songs they find interesting. While the group worked for sharing, it was not that great of a place to listen to what had been shared.',
    'With a group of like minded folks, we built a webapp that presented the songs as a playlists with genres and artists. It allowed sorting by number of post likes as well.',
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
      path: 'home.png',
      description: ['The app was designed first in figma.', 'It takes inspiration from Youtube.'],
    },
    {
      path: 'gallery.png',
      description: ['The feed is lists all the songs in order of recency.'],
    },
    {
      path: 'player.png',
      description: ['The player is an embedded youtube player.', 'We switch up the songs automatically, and there were no ads in the way.'],
    },
    {
      path: 'dark-and-mobile.png',
      description: ['Components were designed to suit both the modes and adapt to smaller mobile screens.'],
    },
    {
      path: 'social.png',
      description: ['I also designed the branding and the logo for the project.', 'The logo incorporates the main building of KGP and the branding resonates with the sound waves of the songs being posted.'],
    },
    {
      path: 'lttkgp-dark.png',
      description: ['Here is a screenshot of the platform running in flesh and bone.'],
    },
    {
      path: 'lttkgp-gallery-dark.png',
      description: ['The several different playlists curate the songs depending of different factors.', 'For example the underrated gems chooses songs with less total views that might not be as popular, therefore underrated.', 'Frequently shared collects songs with more than 1 share, that is songs shared multiple times by different people.'],
    },
    {
      path: 'lttkgp-gallery-light.png',
      description: ['The light mode worked quite well.'],
    },
    {
      path: 'lttkgp-player.png',
      description: ['The player ended up being nice and clean.', 'Features such as next and previous buttons and keyboard shortcuts were not planned or designed in the prototype but implemented after user suggestions and feedback.'],
    },
  ]
}
