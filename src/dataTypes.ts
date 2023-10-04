
export interface Heading {
  depth: number;
  text: string;
  slug: string;
}

export interface NestedHeading extends Heading {
  subheadings: Heading[];
}
