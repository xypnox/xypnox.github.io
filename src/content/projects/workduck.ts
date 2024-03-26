import type { ProjectData } from "./types";

export const WorkduckProject: ProjectData = {
  title: 'Workduck',
  slug: 'workduck',
  year: '2021-2023',
  description: [
    'A platform solving a bunch of work problems, which didn\'t work out.',
  ],
  content: [
    'What started as a testing platform for mobile apps transformed to a work platform for modern product teams.',
    'It collected and organizied data from Slack, GitHub, Jira, Linear, and more.',
    'I created several prototypes, from rough ideations to high-fidelity interfaces.',
    'I built the frontend with Electron and React. Ideating and building most features, from design to development.',
    'Apart from the usual; I got my hands on content marketing, SEO, and even a bit of sales.',
    'Even after so many images there was still far too much in this endeavor than I could share here. Perhaps I will add them later.'
  ],
  image: '/icons/Workduck.svg',
  link: 'https://mexit.so',
  tags: ['Electron', 'React', 'Typescript', 'Figma'],
  cover: {
    src: "editor-graph.png",
    alt: "Mex's editor with the graph opened towards the side highlighting the connected notes.",
  },
  images: [
    {
      path: 'proto-landing.png',
      title: 'The Origins',
      description: ['It started as a testing platform for mobile apps.'],
    },
    {
      path: 'logo-grid.png',
      description: [
        'I joined as a designer and frontend developer.',
        'I designed the logo and built their first decent landing page.'
      ],
    },
    {
      path: 'testing-illus.png',
      title: 'Testing',
      description: [
        'The platform was designed to test mobile apps.',
        'It ran built versions of apps on emulator and simulated user interactions in flows.',
        'It required no local installation and the testing and reporting happened in the cloud.'
      ],
    },
    {
      path: 'testing-features.png',
      description: [
        'It planned to offer a bunch of features.',
        'Several of which we built and tested, but never launched.'
      ],
    },
    {
      path: 'testing-social.png',
      title: 'Pivots',
      description: [
        'From there the idea evolved',
        'From just a testing tool with product flows',
        'To a platform aware of the product, the design, the development, and the team.',
        'Perhaps such overarching platforms are too ambitious for a small team.',
        'Only time could tell, and tell it did.'
      ],
    },
    {
      path: 'mex-old.png',
      description: [
        'The umbrella we found to shelve the complexity of knowledge at workplace was named Mex.',
        'It piggy backed on rich text editors, making notes a central part of the platform.',
        'In theory you could write anything. Indeed it could be molded to any usecase.',
        'It was so close to raw data after all.',
        'I worked on the editor, hacking together several core features on top of libraries built with everchanging APIs and buggy plugins.'
      ],
    },
    {
      path: 'editor-frontend.png',
      description: [
        'I have skipped several iterations made before, in between, and after.',
        'After years of development the product fleshed out to a decent quality.',
        'At least in terms of design. (Bugs not included)'
      ],
    },
    {
      path: 'editor-tasks.png',
      description: [
        'As mentioned before, the base was a rich text editor.',
        'We extended its functionality by allowing links to other notes with [[]].',
        'One could also embed the notes! Or just a specific part of it.',
        'You could menton users with @, and even create tasks with [ ]',
        'The tasks had a in progress status as well. And the people in the task were assigned that task!',
        'There were tags too! just like the #ones.'

      ],
    },
    {
      path: 'editor-embed-preview.png',
      description: [
        'The cross-links and embeds were not just static.',
        'They allowed popup previews of the linked notes.',
        'Backlinks and forward links were also shown in the sidebar.',
      ],
    },
    {
      path: 'editor-graph.png',
      description: [
        'With time as your notes grew and linked together, it became easier to visualize the connections.',
        'The graph showed a global and a local live preview of the notes and their links.'
      ],
    },
    {
      path: 'editor-canvas-table.png',
      description: [
        'The usual web embeds worked as expected.',
        'There was canvas embed powered by the venerable Excalidraw.',
        'And there were tables.',
        'If you didn\'t notice, there was a table of content in the sidebar all along.'
      ],
    },
    {
      path: 'editor-linear.png',
      description: [
        'One of the core features was the ability to embed and interact with other platforms.',
        'For example, one could embed a list of assigned linear issues.',
        'Or a specific issue in detail from Linear.',
        'You could save messages from slack, or handle tasks from slack itself.'
      ],
    },
    {
      path: 'integrations.png',
      description: [
        'We developed several working integrations with multiple services.',
        'Portals allowed converting and saving messages from platforms inside notes.',
        'Calendar allowed syncing events reminders and meetings.',
      ],
    },
    {
      path: 'reminders.png',
      description: [
        'With calendar synced, and having the local permissions for notifications,',
        'One could set reminders for notes, tasks, or events.',
        'I made a complex reminder system, that could create reminders from the note itself.',
        'Just invoke \\remind in editor with a prefrred time in natural language and it would create a reminder for you.',
        'For example, \\remind tomorrow at 10am to finish this note.'
      ],
    },
    {
      path: 'tasks.png',
      description: [
        'Tasks could be inside multiple notes, and spaces.',
        'Organizing and tracking tasks became easier with a dedicated task view.',
        'One could create views with specific filters and save them for later use.',
        'The task view allowed for a kanban like workflow, with drag and drop tasks.'
      ],
    },
    {
      path: 'search-filter.png',
      description: [
        'Search was needed. Obviously.',
        'We had full text search with all the filters on top of notes, tags, spaces, mentions etc.',
        'Nice preveiws with the search results made it easier to find the right piece of knowledge.',
      ],
    },
    {
      path: 'mex-features.png',
      description: [
        'All of these features and the ones I missed were also extended to Spotlight.',
        'A small window to access mex from anywhere in the system.',
        'You could create notes from a text selection, or take a screenshot, or browse and search through the notes.',
        'Or invoke several web commands like a new meeting or search on twitter.',
        'Or use snippets created inside mex anywhere!'
      ],
    },
    {
      path: 'mex-landing.png',
      description: [
        'It was supposed to be the next core tool for modern product teams.',
        'But it never took off. The complexities introduced from feature stacking became overbearing.',
        'And even if you could build it all, the users were not ready for such a tool, we had yet to find them.',
        'So many want to use a tool that solves everything, but no one wants to adapt to such a tool.',
        'And for a tool that could do so much, finding a initial target customer became a challenge, which was never really solved.'
      ],
    },
    {
      path: 'proto-sidebar.png',
      title: 'Prototypes',
      description: [
        'As we were building mex, the complexity grew.',
        'Several interactions became possible which were not accounted for when we first developed the App.',
        'I approached it with wireframes and prototypes. Creating and experimenting with several ideas.',
        'Here are some prototypes of the sidebar with the new spaces feature. (I can\'t explain all the features (there were too many))'
      ],
    },
    {
      path: 'proto-comments.png',
      description: [
        'Similarly, I created prototypes for the comments and threads.',
        'One could add a reaction to individual blocks of the editor or the comments as well.'
      ],
    },
    {
      path: 'proto-filters.png',
      description: ['The filters of search were reworked and prototyped several times.'],
    },
    {
      path: 'proto-zoom-out.png',
      description: [
        'We also prototyped potential features we never developed.',
        'For example, a social feed for all memebers of a team to get on top of the updates happening across their work.',
      ],
    },
    {
      path: 'proto-feed.png',
      description: ['And the prototypes were not that low fidelity either.'],
    },
    {
      path: 'proto-style.png',
      description: [
        'There was tons of iterations, debates, debacles and learnings while designing the layout of the editor.',
        'So many variations were possible, and so little user data to guide us in the right direction.',
      ],
    },
    {
      path: 'proto-style-dashboard.png',
      description: [
        'Some of the prototypes went a little more experimental like this dashboard.',
        'I wonder how hard it would have been to implement.',
        '(It was very fun to design though)'
      ],
    },
    {
      path: 'color-exp.png',
      description: [
        'With the several iterations and prototypes, the design evolved.',
        'I tested and experimented with lots of colors and themes.',
      ],
    },
    {
      path: 'mex-themes.png',
      description: [
        'The various variety of themes and colors that could be applied to the editor was staggering.',
        'And each layout usually carried a new theme with it as well.'
      ],
    },
    {
      path: 'theme-exp.png',
      description: [
        'The experiments didn\'t stop with the colors though.',
        'Images as backgrounds with matching or contrasting colors gave a different feel to the editor.',
      ],
    },
    {
      path: 'proto-theme.png',
      description: ['One such experiments made it back into the editor'],
    },
    {
      path: 'proto-theme-large.png',
      description: [
        'It looked good, and it was my favorite.',
        'Accompanied with it\'s swirly background the theme is at once both goofy and elegant.',
      ],
    },
    {
      path: 'themes-vertigo.png',
      description: [
        'Here it is in the app, called vertigo!',
        'It changed the whole feel of the app.',
        'The experience from building the themes and applying them was invaluable for my future projects.'
      ],
    },
    {
      path: 'mex-3d.png',
      description: [
        'It was a awesome piece of software that never saw the light of the day.',
        'One would always wonder what could have been.',
        'But the learnings were invaluable.'
      ],
    },
  ]
}
