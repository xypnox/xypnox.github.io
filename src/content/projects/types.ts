import type { Image } from "../../dataTypes";

// Image in the data files
export interface RawProjectImage {
  path: string
  title?: string
  description: string[]
}

// Image for rendering, after optimization
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
