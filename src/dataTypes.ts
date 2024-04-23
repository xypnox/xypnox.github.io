import type { GetImageResult } from "astro";

export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

export interface NestedHeading extends Heading {
  subheadings: Heading[];
}

export interface MetaData {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  tags?: string[];
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
  };
  og?: {
    site_name?: string;
  };
}

export interface BaseLayoutProps {
  title: string;
  meta?: MetaData;
  showLoading?: boolean;
  htmlClass?: string;
  hideNav?: boolean;
  themeCssVars?: string;
}

export interface Image {
  // URL of the image
  alt?: string
  image: GetImageResult
}


interface Enclosure {
  "media:rating": {
    "$text": string;
    "scheme": string;
  };
  "media:description": {
    "$text": string;
    "type": string;
  };
  url: string;
  type: string;
  fileSize: string;
  medium: string;
}

interface Thumbnail {
  "media:rating": {
    "$text": string;
    "scheme": string;
  };
  "media:description": {
    "$text": string;
    "type": string;
  };
  url: string;
  type: string;
  fileSize: string;
  medium: string;
}

interface Media {
  thumbnail: Thumbnail | Thumbnail[];
}

interface Item {
  id: string;
  title?: string;
  author?: string;
  content?: string;
  description: string;
  link: string;
  published: number;
  created: number;
  category: any[];
  enclosures: Enclosure[];
  media?: Media;
}

interface RootObject {
  title: string;
  description: string;
  link: string;
  image: string;
  category: any[];
  items: Item[];
}

export type { RootObject, Item, Media, Thumbnail, Enclosure };
