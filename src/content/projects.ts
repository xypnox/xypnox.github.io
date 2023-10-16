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
      'My Project to create, edit, curate and prune my personal notes. Currently private. I share some details and usecases for this once in a while.',
    ],
    image: 'https://via.placeholder.com/150',
    tags: ['SolidJS', 'Typescript', 'Figma']
  },
  {
    title: 'Calry',
    year: '2023',
    description: [
      'A startup to help people find the best fitness classes in their city'
    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://calry.app',
    tags: ['SolidJS', 'Typescript', 'Figma']
  },
  {
    title: 'Workduck',
    year: '2021-2023',
    description: [
      'Workduck is a no-code process automation platform for modern product teams. It helps you to focus on product building by taking care of documentation, testing, and communication with stakeholders etc. It serves as a central hub for organizing and collecting data from apps like Slack, GitHub, Jira, Linear, and more.',

      'I worked on the frontend of the electron desktop application. In it I owned the  feature design and development. As the application focused on offering a Rich Text editor with superpowers, I became intimately familiar with Text Editors, the DOM and the curse of the unending renderers.',

      'I worked on things larger than the same'
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

      "I worked on both the backend and frontend of the application. It's written in Rust and Elm combined in the specialized Realm framework. I added several small features and pages. I also created the stats ingestion system for the backend."

    ],
    image: 'https://via.placeholder.com/150',
    link: 'https://www.google.com',
    tags: ['Rust', 'Elm']
  },
  {
    title: 'LTTKGP',
    year: '2020',
    description: [
      'Listen to this KGP is a facebook group where people share songs they find interesting.',

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
