import { addIcon } from "iconify-icon";

export const icons = {
  "home": "ph:house-duotone",

  "github": "fa-brands:github",
  "mastodon": "fa-brands:mastodon",
  "email": "ic:round-mail",
  "telegram": "fa-brands:telegram",
  "goodreads": "fa-brands:goodreads",
  "spotify": "fa6-brands:spotify",

  "lit": "ph:pen-nib-duotone",
  "design": "ph:paint-brush-duotone",
  "dev": "uim:apps",
  "links": "ph:link-duotone",

  "menu": "ph:dots-three",

  "customize": "xyp:customize",

  "expand": "ph:caret-down-duotone",
  "collapse": "ph:caret-left-duotone",

  "delete": "ph:trash-simple",
  "close": "ph:x",

  "external": "ph:arrow-square-out",

  "wip": "ph:traffic-cone-duotone",
  "guide": "ph:book-open-text-duotone",

  "debug": "ph:hammer-duotone",

  "edit": "ph:pencil-duotone",

  "new": "ph:plus-circle-duotone",

  "colors": "ph:palette-duotone",
  "typography": "ph:text-aa-duotone",
  "layout": "ph:grid-four-duotone",
  "copy": "ph:copy-duotone",
  "import": "ph:arrow-fat-line-down-duotone",

  "light": "ph:sun-duotone",
  "dark": "ph:moon-duotone",
  "auto": "ph:circle-half-duotone",

  "done": "ph:check-circle",

  "error": "ph:warning-duotone",

  "search": "ph:magnifying-glass",

  "filter": "ph:funnel-duotone",

  "fav": "ph:star-duotone",
  "favAnim": "line-md:star-pulsating-twotone-loop",

  "shuffle": "ph:shuffle-duotone",

  "musicMute": "ph:speaker-none-duotone",
  "music": "ph:speaker-high-duotone",
  "musicNotes": "ph:music-notes-duotone",

  "next": "ph:skip-forward-duotone",
  "prev": "ph:skip-back-duotone",

  "controls": "ph:nut-duotone",
  "controlsCollapsed": "ph:nut",

  "zoomIn": "ph:magnifying-glass-plus-duotone",
  "zoomOut": "ph:magnifying-glass-minus-duotone",

  "image": "ph:image-duotone",

  "award": "ph:trophy-duotone",

  "books": "ph:books-duotone",
  "quotes": "ph:quotes-duotone",
  "library": "fluent:building-bank-28-regular",

  "refresh": "ph:arrows-clockwise-duotone",

  "camera": "ph:camera-duotone",
}

const CustomizeIcon = `<path d="M4 10h8v1.47c0 .3-.24.53-.53.53H4.53a.53.53 0 0 1-.53-.53V10Z" fill="currentColor"/><rect opacity=".5" x="7" y="10" width="2" height="4" rx=".53" fill="currentColor"/><path opacity=".75" d="M4 6.53c0-.3.24-.53.53-.53H6v2.47c0 .3-.24.53-.53.53h-.94A.53.53 0 0 1 4 8.47V6.53Z" fill="currentColor"/><path opacity=".5" d="M4 2.53c0-.3.24-.53.53-.53h.94c.3 0 .53.24.53.53V5H4.53A.53.53 0 0 1 4 4.47V2.53Z" fill="currentColor"/><path opacity=".75" d="M7 2.53c0-.3.24-.53.53-.53h.94c.3 0 .53.24.53.53V6H7V2.53Z" fill="currentColor"/><path d="M7 7h2v1.47c0 .3-.24.53-.53.53h-.94A.53.53 0 0 1 7 8.47V7Z" fill="currentColor"/><path opacity=".75" d="M10 6h1.47c.3 0 .53.24.53.53v1.94c0 .3-.24.53-.53.53h-.94a.53.53 0 0 1-.53-.53V6Z" fill="currentColor"/><path opacity=".5" d="M10 2.53c0-.3.24-.53.53-.53h.94c.3 0 .53.24.53.53v1.94c0 .3-.24.53-.53.53H10V2.53Z" fill="currentColor"/>`


export const defineCustomIcons = () => {
  addIcon('xyp:customize', {
    body: CustomizeIcon,
    width: 16,
    height: 16,
  });
}
// {
//   name: 'GitHub',
//   url: 'https://github.com/xypnox',
//   icon: 'bi:github',
// },
// {
//   name: 'Mastodon',
//   url: 'https://fosstodon.org/@xypnox',
//   icon: 'bi:mastodon',
// },
// {
//   name: 'Email',
//   url: 'mailto:xypnox+emailOnWebsite@gmail.com',
//   icon: 'ph:envelope-duotone',
// },
// {
//   name: 'Telegram',
//   url: 'https://t.me/xypnox',
//   icon: 'ph:envelope-duotone',
// },
// {
//   name: 'Goodreads',
//   url: 'https://goodreads.com/xypnox',
//   icon: 'ph:envelope-duotone',
// },
