import type { Image } from "../dataTypes";

export interface RawProjectImage {
  path: string
  title?: string
  description: string[]
}
export interface ProjectImage extends Image {
  title?: string;
  description: string[];
}


export interface ProjectData {
  title: string
  slug: string
  year?: string
  description: string[]
  content?: string[]
  image: string
  cover?: {
    src: string
    alt: string
  }
  images?: RawProjectImage[]
  link?: string
  award?: string
  tags: string[]
}

export const Projects: ProjectData[] = [
  // {
  //   title: 'Studio',
  //   year: '2023',
  //   description: [
  //     'A design studio that helps startups and similar fast moving teams with design services.',
  //     'The design as a service model allows people to easily and reliably collaborate with ',
  //     'Currently private. (But hope to open the code later)',
  //   ],
  //   content: []
  //   image: '/icons/Notes.svg',
  //   tags: ['SolidJS', 'Typescript', 'Figma']
  // },
  {
    title: 'Notes',
    slug: 'notes',
    year: '2023',
    description: [
      'A project started from the grind to create, edit, curate and prune my personal notes.  ',
    ],
    content: [
      'Meant to be the viewing and exploratory medium to my heirarchal interlinked notes.',
      'Several personal learnings from past experiences went into it\'s creation.',
      'It has been worked on and used contiuously, almost every day, for the past couple of years.',
      'Currently private but I hope to release it someday far into the future.',
      'I also use it\'s codebase to test out new interactions and ideas with note taking.',
      'All of the design and code was handcrafted with pain sweat and tears.',
    ],
    image: '/icons/Notes.svg',
    cover: { src: 'notes-project.png', alt: 'The notes project note rendered inside notes project.' },
    images: [
      /*
        design-concept.png
        notes-raw-markdown.png
        notes-project.png
        regular-dark.png
        regular-light.png
        zen-light.png
        zen-dark.png
        markdown-elements.png
        journal-entry.png
        calendar-year.png
        lib-note.png
        discourse-lib.png
        highlight-import.png
        lib-grid.png
        dashboard.png
        bookmark-search-wide.png
        ix-note.png
        vocab-note.png
        */
      {
        path: 'design-concept.png',
        description: ['It started with the idea of rendering my markdown notes in a beautiful interface.'],
      },
      {
        path: 'notes-raw-markdown.png',
        title: 'Raw Note',
        description: [
          'The raw format of notes includes just the id, title and the content.',
          'The created updated are superfluous as git handles the history.',
        ],
      },
      {
        path: 'regular-dark.png',
        title: 'The Note',
        description: [
          'What a simple text note looks like.',
          'Notice the hierarchal tree of notes on the left and the table of contents on the right.',
          'There is another header with actions related to the note, for example:',
          'Edit, Create Child, Browse History, Delete etc.',
        ],
      },
      {
        path: 'regular-light.png',
        title: 'Light theme',
        description: [
          'And of course it has to be themeable.',
          'The light and dark themes are static in notes, unlike the crazy theming on this website!',
        ],
      },
      {
        path: 'zen-light.png',
        title: 'Zen Mode',
        description: ['And an zen mode for even more focus.'],
      },
      {
        path: 'zen-dark.png',
        description: ['Obviously everything works for both themes.'],
      },
      {
        path: 'markdown-elements.png',
        title: 'Markdown Elements',
        description: [
          'Various markdown elements are supported including code, math formulas, lists and tables.',
        ]
      },
      {
        path: 'tasks.png',
        title: 'Tasks',
        description: [
          'Tasks are created individually inside the note as lists.',
          'They can be nested.',
          'Also, there are more than just pending and done markers.',
          'There are also markers for cancelled tasks and backlog. By tradition a cancelled task has a note on why it was cancelled'
        ],
      },
      {
        path: 'journal-entry.png',
        title: 'Journal Entry',
        description: [
          'The journal is a special note that is created for each day.',
          'It is nested inside the year, and month.',
          'Notice how it is liked to the notes of the people interacted during that day and other misc notes such as library.',
          'Notice the calendar on the side, which is a quick way to navigate to any day. It borders the days with journal with circle.'
        ]
      },
      {
        path: 'calendar-year.png',
        title: 'Calendar',
        description: [
          'The calendar is a interface to interact with journal.',
          'Both calendars, the one in sidebar and the one in the dashboard (shown later) are switchable between month and year modes.',
          'The days past don\'t have a background, the days with journal have a circle, and the current day is highlighted with the primary color, and sundays are marked red.',
          'Also the holidays have dotted border and show the name of the holiday on hover.',
        ]
      },
      {
        path: 'lib-note.png',
        title: 'Library Note',
        description: [
          'The lib or Library is a collection of notes taken about specific artifacts.',
          'Usually the artifacts include: Books, Articles, Videos, Blog Posts, Papers etc.',
          'Some category of artifacts are nested inside specific notes: lib.books, lib.movies, lib.series etc.',
          'Also notice the nice back and forward links, which are shown only when the note has one!',
        ],
      },
      {
        path: 'discourse-lib.png',
        title: 'Note on Discourse',
        description: [
          'Consider this note taken from the notes of xxiivv about discourse.',
          'The notes are linked to the relevant topic: phi.comm.discourse, where phi stands for philosophy and comm for communication.',
          'The highlights are present in the note as well as the link to the original source.'
        ]
      },
      {
        path: 'highlight-import.png',
        title: 'Hypothesis highlights',
        description: [
          'Web pages are highlighted with hypothes.is and then imported from it\'s API.',
          'The importer generates a decent slug and adds the structure for a library note.',
          'This makes it simple to import highlights to my notes.',
          'Earlier I used to do all the steps by hand.'
        ]
      },
      {
        path: 'lib-grid.png',
        title: 'Library Grid',
        description: [
          'The notes of library are also shown in a grid view.',
          'This flattens the seemingly complicated nested structure of the library.',
          'Plans to make it searchable and filterable are on the way'
        ]

      },
      {
        path: 'dashboard.png',
        title: 'Dashboard',
        description: [
          'Given so many features, a dashboard comes in handy!',
          'It consists of the clock and calendar, the tree of notes to the side, a few important notes and a link to today\'s journal note.',
          'It also lists the most recently edited notes'
        ],
      },
      {
        path: 'bookmark-search-wide.png',
        title: 'Browser is here',
        description: [
          'I have a script that replicates the browser history and bookmarks from Firefox to the notes db.',
          'This gives me a way to search the bookmarks and history from the notes interface.',
          'This will also later help me to link the library notes and links inside notes to the web pages.'
        ]
      },
      {
        path: 'ix-note.png',
        description: [
          'Sometimes I make notes about interfaces, this ix note tree is an attempt of mine to understand interfaces.',
          'Notice the graphics used to explain the points visually.'
        ]
      },
      {
        path: 'vocab-note.png',
        title: 'Vocabulary Note',
        description: [
          'I maintain a note with the list of words I come across that I liked and their meanings.',
        ]

      },
      {
        path: 'in-use.png',
        title: 'Editing',
        description: [
          'Editing the notes happens inside vim. Because noting is better than vim for editing plain text.',
          'I have also aded a plugin to autocomplete the links to other notes.',
          'Notice how the autocomplete does not even need any prefix, it just works.'
        ]
      }

    ],
    tags: ['SolidJS', 'Typescript', 'Figma']
  },
  {
    title: 'Calry',
    year: '2023',
    description: [
      'A startup I was a founding member of in 2023. We aimed to solve various problems in the data space and later pivoted to serving as a integration aggregator and dev tool for the hospitality industry.',
    ],
    content: [
      'I worked on the design and development of the product and the website. I created several prototypes, revamped the design of the website 4 times in 3 months as we pivoted from one idea to another.',
      'I was involved in a high degree, but once I heard the call of design, I could not resist and left to start the studio.'
    ],
    image: '/icons/Calry.svg',
    link: 'https://calry.app',
    tags: ['SolidJS', 'Typescript', 'Figma']
  },
  {
    title: 'Nirah',
    year: '2023',
    description: [
      'A startup offering enterprise-first secure, reliable, and scalable webhook platform.',
    ],
    content: [
      'I collaborated with the founder, and in a 10 day sprint, we designed and developed the product interfaces, website, blog, docs, brand, illustrations.',
    ],
    image: '/icons/Nirah.svg',
    link: 'https://nirah.app',
    tags: ['Django', 'Astro', 'Figma']
  },
  {
    title: 'Workduck',
    year: '2021-2023',
    description: [
      'Workduck was a work platform for modern product teams. It helped people focus on product building by taking care of documentation, testing, and communication with stakeholders etc. ',
    ],
    content: [
      'It served as a central hub for organizing and collecting data from apps like Slack, GitHub, Jira, Linear, and more.',
      'I worked on the frontend of the electron desktop app. I owned most features, from design to development. As the experience centered around a Rich Text editor with superpowers, I became intimately familiar with Text Editors, the DOM and the problems of the cursed re-renders.',
      'Apart from the usual design of the brand of the company, website, and product design (and frontend); I got my hands on content marketing, SEO, and even a bit of sales. I created several prototypes, from rough ideations to high-fidelity interfaces.',
    ],
    image: '/icons/Workduck.svg',
    link: 'https://mexit.so',
    tags: ['React', 'Typescript', 'Figma']
  },
  {
    title: 'Fifthtry',
    year: '2020',
    description: [

      'I worked at fifthry when it was a documentation tool that integrated with Github Pull Request, to ensure that no code goes live without being updated in the documentation.',

    ],
    content: [
      "I worked on both the backend and frontend of the application. Written in Rust and Elm, in the specialized Realm framework. I worked in change requests, a feature similar to pull requests where I had to deal with versioning and diff of a text document.",
      "I also contributed to the data and performance analytics stack for the backend that collected details of all calls made, with the functions that were called, in the order they were called, and what time they took."
    ],
    image: '/icons/Fifthtry.svg',
    link: 'https://fifthtry.com',
    tags: ['Rust', 'Elm']
  },
  {
    title: 'Grameen Setu',
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
    tags: ['React', 'Typescript']
  },
  {
    title: 'LTTKGP',
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
    tags: ['React', 'Typescript']
  },
  {
    title: 'Marg',
    year: '2020',
    description: [
      'Monitor Assess Report Guide, was an entry for InterIIT Tech 2021, as a complete ecosystem for the citizens and government to ease the process of road maintenance and progress checking.',
    ],
    content: [
      'We tried to incorporate a sense of ownership towards their surroundings as well as to motivate them using the stories of other people who have successfully helped the government.',
      'I worked on the design and frontend of the application.'
    ],
    award: 'Gold @ InterIIT Tech 2020 in Coding hackathon',
    image: '/projects/marg.png',
    tags: ['React', 'Typescript']
  },
  {
    title: 'Finbox',
    description: [
      'Finbox is a fintech company that allows you to embed lending infratstructure in your application.',
    ],
    content: [
      'I worked on the landing page and the entire website from scratch. Using react-static, I generated static pages SPA navigation.',
      'I also organized Design Sprints to target specific audiences, started from scratch with UI/UX to develop a unique brand identity for the company. Made personalized icons. illustrations, animations, etc.'
    ],
    image: '/icons/finbox.svg',
    link: 'https://finbox.in',
    tags: ['React Static']
  },
].map((p) => ({
  ...p,
  slug: p.title.toLowerCase().replace(/ /g, "-"),
}))
