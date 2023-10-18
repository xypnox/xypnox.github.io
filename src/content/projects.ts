interface ProjectData {
  title: string
  year?: string
  description: string[]
  image: string
  link?: string
  tags: string[]
}

export const Projects: ProjectData[] = [
  {
    title: 'Notes',
    year: '2023',
    description: [
      'The constant grind to create, edit, curate and prune my personal notes. Currently private. I share some insights and tips about note taking once in a while.',
      'Several learnings of past experiences went into this.',
    ],
    image: 'https://via.placeholder.com/150',
    tags: ['SolidJS', 'Typescript', 'Figma']
  },
  {
    title: 'Calry',
    year: '2023',
    description: [
      'A startup I was a founding member of in 2023. I was initially involved to a higher degree but once I heard the call of design, I could not resist.',
      'I worked on the design of the product and the website. I created several prototypes, revamped the design of the website 4 times in 3 months as we pivoted from one idea to another.',
    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://calry.app',
    tags: ['SolidJS', 'Typescript', 'Figma']
  },
  {
    title: 'Workduck',
    year: '2021-2023',
    description: [
      'Workduck was a no-code process automation platform for modern product teams. It aimed to help people to focus on product building by taking care of documentation, testing, and communication with stakeholders etc. It served as a central hub for organizing and collecting data from apps like Slack, GitHub, Jira, Linear, and more.',

      'I worked on the frontend of the electron desktop application. I ideated and executed the features from design to development to deployment. As the application focused on offering a Rich Text editor with superpowers, I became intimately familiar with Text Editors, the DOM and the curse of the unending renderers.',

      'Apart from the usual design of company brand, website, and product design and frontend; I got my hands on content marketing, SEO, and even a bit of sales. I created several prototypes, from rough ideations to high-fidelity interfaces.',
    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
    tags: ['React', 'Typescript', 'Figma']
  },
  {
    title: 'Fifthtry',
    year: '2020',
    description: [
      'Fifthtry is a documentation tool that integrates with Github Pull Request, to ensure that no code goes live without being updated in the documentation.',
      "I worked on both the backend and frontend of the application. Written in Rust and Elm, in the specialized Realm framework. I worked in change requests, a feature similar to pull requests where I had to deal with versioning and diff of a text document.",
      "I also contributed significantly to the data and performance analytics stack for the backend that collected details of all calls made, with the precise functions that were called and in the order they were called and what time they took for each call."

    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
    tags: ['Rust', 'Elm']
  },
  {
    title: 'LTTKGP',
    year: '2020',
    description: [
      'Listen to this KGP is a facebook group where people share songs they find interesting. While the group works for sharing, it is not that great of a place to listen to what has been shared.',
      'LTTKGP webapp provides a way to browse and listen to the songs posted with a better interface and queued playlists.',
      'I designed and developed the frontend with React/Typescript from scratch.'
    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
    tags: ['React', 'Typescript']
  },
  {
    title: 'Grameen Setu',
    description: [
      'This is a project'
    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
    tags: ['React', 'Typescript']
  },
  {
    title: 'Marg',
    description: [
      'Monitor Assess Report Guide, a complete ecosystem for the citizens and government to ease the process of road maintenance and progress checking.',

      'We tried to incorporate a sense of ownership towards their surroundings as well as to motivate them using the stories of other people who have successfully helped the government.',

      'It won Gold in InterIIT Tech 2020 Coding hackathon. I worked on the UI/UX and frontend of the application.'
    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
    tags: ['React', 'Typescript']
  },
  {
    title: 'Finbox',
    description: [
      'Finbox is a fintech company that allows you to embed lending infratstructure in your application.',
      'I worked on the landing page and the entire website from scratch. I utilized react-static to generate static pages with instant navigation. I also organized Design Sprints to target specific audiences, started from scratch with UI/UX to develop a unique brand identity for the company. Made personalized icons. illustrations, animations, etc.'
    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
    tags: ['React Static']
  },
]
