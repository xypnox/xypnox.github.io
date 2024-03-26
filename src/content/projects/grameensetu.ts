import type { ProjectData } from "./types";

export const GrameenSetuProject: ProjectData = {
  title: 'Grameen Setu',
  slug: 'grameen-setu',
  year: '2021',
  description: [
    'GrameenSetu was an entry for InterIIT Tech 2021 as an all-in-one platform designed for rural producers to connect with SMEs.',
  ],
  content: [
    'The platform offers a user-friendly interface, an improved e-marketplace tailored to their needs, and promotes collaborations among rural producers to enhance the rural economy.',
    'I led the tech team, designed and developed the frontend of the application. I also designed the logos and the branding for the project.',
  ],
  award: 'Gold @ InterIIT Tech 2021 in Drishtee’s Tech-led Innovation for Rural Entrepreneurs',
  image: '/projects/GrameenSetu.svg',
  tags: ['React', 'Typescript'],
  cover: {
    alt: 'Grameen Setu',
    src: 'green-proto.png',
  },
  images: [
    {
      description: ['The landing page of the platform.'],
      path: 'blue-proto.png',
    },
    {
      description: ['The landing page of the platform.'],
      path: 'green-proto.png',
    },
  ],

}
