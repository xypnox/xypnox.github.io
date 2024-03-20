import type { ProjectData } from "./types";

export const FifthtryProject: ProjectData = {
  title: 'Fifthtry',
  slug: 'fifthtry',
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
}
