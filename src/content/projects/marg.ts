import type { ProjectData } from "./types";

export const MargProject: ProjectData = {
  title: 'Marg',
  slug: 'marg',
  year: '2020',
  description: [
    'Monitor Assess Report Guide was a complete ecosystem for the citizens and government for road maintenance and progress checking.',
  ],
  content: [
    'We incorporated a sense of ownership towards public infrastructure in the users.',
    'We also motivated the users with the stories of others who had successfully helped the government.',
    'I worked on the design and frontend of the application.'
  ],
  award: 'Gold @ InterIIT Tech 2020 in Coding Hackathon',
  image: '/icons/marg.svg',
  tags: ['React', 'Typescript'],
  cover: {
    src: "app-pages.png",
    alt: "The screenshots of MARG app, with stats about submitted reports and map with location of reports.",
  },
  images: [
    {
      path: 'app-pages.png',
      description: ['We created two applications, one facing the general public and one for the officials, the screenshots above are from the public app.', 'We focused on making the dashboard inviting and engaging by gamifying several aspects of the app.', 'We added stories in spotlight to highlight the best citizens.', 'We added objectives and stats for further engagement.', 'The flow to make a report was kept as simple and intuitive as possible.'],
    },
    {
      path: 'dashboard.png',
      description: ['The dashboard facing the government officials provided them with the overview of all the reports and allowed them to filter mark and triage the reports accordingly.'],
    },
    {
      path: 'award.png',
      description: ['It won the Gold at InterIIT Tech 2020 in Coding Hackathon.', 'This cheeky illustration was made by me in celebration of that win.'],
    },
  ]
}
