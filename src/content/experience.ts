
interface ExperienceLink {
  name: string;
  url: string;
  icon: string;
}

interface Experience {
  name: string;
  description: string[];
  tag?: {
    name: string;
    icon: string;
  }
  graphic: string;
  links: ExperienceLink[];
}
export const experiences: Experience[] = [
  {
    name: "GrameenSetu",
    tag: {
      name: "Gold InterIIT",
      icon: "mdi:github"
    },
    description: [
      "GrameenSetu is a platform that aims to connect the rural and urban areas of India by providing a platform for the rural people to sell their products and services.",
      "I worked on the frontend of the application. It's written in React/Typescript. I also worked on the backend of the application, which is written in Rust. I also worked on the design of the application."
    ],
    graphic: "grameensetuLogo",
    links: []
  },
  {
    name: "LTTKGP",
    description: [
      "Listen to this KGP is a facebook group where people share songs they find interesting.",
      "LTTKGP webapp provides a way to browse and listen to the songs posted with a better interface and queued playlists.",
      "I designed and developed the frontend with React/Typescript from scratch."
    ],
    graphic: "lttkgpLogo",
    links: [
      {
        "name": "Web App",
        "url": "https://lttkgp.com",
        "icon": "mdi:web"
      },
      {
        "name": "Github Org",
        "url": "https://github.com/lttkgp/",
        "icon": "mdi:github"
      }
    ]
  },
  {
    name: "MARG",
    tag: {
      name: "Gold InterIIT",
      icon: "mdi:github"
    },
    description: [
      "Monitor Assess Report Guide, a complete ecosystem for the citizens and government to ease the process of road maintenance and progress checking.",
      "We tried to incorporate a sense of ownership towards their surroundings as well as to motivate them using the stories of other people who have successfully helped the government.",
      "It won Gold in InterIIT Tech 2020 Coding hackathon. I worked on the UI/UX and frontend of the application."
    ],
    graphic: "margLogo",
    links: []
  },
  {
    name: "Fifthtry",
    tag: {
      name: "Fullstack Intern",
      icon: "mdi:github"
    },
    description: [
      "Fifthtry is a documentation tool that integrates with Github Pull Request, to ensure that no code goes live without being updated in the documentation.",
      "I worked on both the backend and frontend of the application. It's written in Rust and Elm combined in the specialized Realm framework. I added several small features and pages. I also created the stats ingestion system for the backend."
    ],
    graphic: "fifthtryLogo",
    links: [
      {
        "name": "Fifthtry",
        "url": "https://fifthtry.com",
        "icon": "mdi:web"
      }
    ]
  },
  {
    name: "FinBox",
    tag: {
      name: "Design & Frontend Intern",
      icon: "mdi:github"
    },
    description: [
      "Finbox is a fintech company that allows you to embed lending infratstructure in your application.",
      "I worked on the landing page and the entire website from scratch. I utilized react-static to generate static pages with instant navigation. I also organized Design Sprints to target specific audiences, started from scratch with UI/UX to develop a unique brand identity for the company. Made personalized icons, illustrations, animations, etc."
    ],
    graphic: "finboxLogo",
    links: [
      {
        "name": "Finbox",
        "url": "https://finbox.in",
        "icon": "mdi:web"
      }
    ]
  }
]
