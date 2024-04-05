import type { ProjectData } from "./types";

export const MargProject: ProjectData = {
  title: 'Marg',
  slug: 'marg',
  year: '2020',
  description: [
    'Monitor Assess Report Guide was a complete ecosystem for the citizens and government to for road maintenance and progress checking.',
  ],
  content: [
    'We tried to incorporate a sense of ownership towards their surroundings as well as to motivate them using the stories of other people who have successfully helped the government.',
    'I worked on the design and frontend of the application.'
  ],
  award: 'Gold @ InterIIT Tech 2020 in Coding hackathon',
  image: '/icons/marg.svg',
  tags: ['React', 'Typescript'],
  cover: {
    src: "app-pages.png",
    alt: "Marg",
  },
  images: [
    {
      path: 'app-pages.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'award.png',
      description: ['The landing page of the platform.'],
    },
    {
      path: 'dashboard.png',
      description: ['The landing page of the platform.'],
    },
  ]
}
