import { icons } from "./icons";

interface Link {
  name: string;
  url: string;
  icon: string;
}
export const links: Link[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/xypnox',
    icon: icons.github,
  },
  {
    name: 'Mastodon',
    url: 'https://fosstodon.org/@xypnox',
    icon: icons.mastodon,
  },
  {
    name: 'Email',
    url: 'mailto:xypnox+emailOnWebsite@gmail.com',
    icon: icons.email,
  },
  {
    name: 'Telegram',
    url: 'https://t.me/xypnox',
    icon: icons.telegram,
  },
  {
    name: 'Goodreads',
    url: 'https://goodreads.com/xypnox',
    icon: icons.goodreads,
  },
]

