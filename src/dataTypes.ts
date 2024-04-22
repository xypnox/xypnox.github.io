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


interface MediaContent {
  $: {
    url: string;
    type: string;
    fileSize: string;
    medium: string;
  };
  "media:rating": {
    _: string;
    $: {
      scheme: string;
    };
  }[];
  "media:description": {
    _: string;
    $: {
      type: string;
    };
  }[];
}

interface Item {
  link: string;
  pubDate: string;
  guid: string;
  description: string;
  "media:content"?: MediaContent;
  content: string;
  contentSnippet: string;
  isoDate: string;
}

interface ChannelImage {
  link: string;
  url: string;
  title: string;
}

interface Feed {
  items: Item[];
  image: ChannelImage;
  title: string;
  description: string;
  generator: string;
  link: string;
  lastBuildDate: string;
  "webfeeds:icon": string;
}

export type { Feed, Item, ChannelImage, MediaContent }
