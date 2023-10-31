interface Link {
  name: string;
  url: string;
  icon: string;
}

export const links: { [key: string]: Link } = {
  home: {
    name: 'Home',
    url: '/',
    icon: 'solar:home-smile-angle-bold-duotone',
  },
  code: {
    name: 'Code',
    url: '/code',
    icon: 'bi:github',
  },
  art: {
    name: 'Art',
    url: '/art',
    icon: 'bi:palette',
  },
  text: {
    name: 'Text',
    url: '/text',
    icon: 'bi:mastodon',
  },
  about: {
    name: "About",
    url: "/about",
    icon: "bi:camera",
  }
}


