import type { ProjectData } from "./types";

export const NotesProject: ProjectData = {
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
}
