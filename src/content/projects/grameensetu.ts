import type { ProjectData } from "./types";

export const GrameenSetuProject: ProjectData = {
  title: 'Grameen Setu',
  slug: 'grameen-setu',
  year: '2021',
  description: [
    'An all-in-one platform designed for rural producers to connect with SMEs.',
  ],
  content: [
    'The platform offered a user-friendly interface, an improved e-marketplace tailored to their needs, and promoted collaborations among rural producers to enhance the rural economy.',
    'I led the tech team, designed and developed the frontend of the application. I also designed the logos and the branding for the project.',
  ],
  award: 'Gold @ InterIIT Tech 2021 in Drishtee’s Rural Innovation',
  image: '/projects/GrameenSetu.svg',
  tags: ['React', 'Typescript', 'Figma'],
  cover: {
    alt: 'Several screens of GrameenSetu application',
    src: 'green-proto.png',
  },
  images: [
    {
      description: [
        'GrameenSetu was a platform designed for rural producers to connect with SMEs.',
        'Rural producers could list their products on the platform and SMEs could buy them in bulk.',
      ],
      path: 'branding.png',
    },
    {
      description: ['SMEs could bid on the products listed by the rural producers.',
        'This ensured that high quality products were sold at a fair price.'],
      path: 'dash-app.png',
    },
    {
      description: ['The logistics were handled by a delivery partner that ensured the products reached the SMEs on time.', 'The details of delivery were handled all within the app.'],
      path: 'logistics-app.png',
    },
    {
      description: ['The app allowed SHGs, the self help groups, to connect to each other as well.', 'This allowed them to collaborate for larger or complex orders and sourcing raw materials.',],
      path: 'sellers-app.png',
    },
    {
      description: ['Each product had a detailed page and bids were shown openly.'],
      path: 'product-app.png',
    },
    {
      description: ['Pardon the puns'],
      path: 'search app.png',
    },
    {
      description: ['Each product had a detailed page and bids were shown openly.'],
      path: 'pipe-app.png',
    },
    {
      description: ['Apart from the technical aspects, I also made a couple of slides for the presentation.'],
      path: 'slide-tech.png',
    },
    {
      description: ['We designed the prototype in figma first before coding it from scratch.'],
      path: 'blue-proto.png',
    },
    {
      description: ['Several pages such as this and the next required a few iterations to get them right.'],
      path: 'dashboard-figma.png',
    },
    {
      description: ['The tender page was one of the most important pages of the app as it would be the most valuable action.'],
      path: 'tender-figma.png',
    },
  ],

}
