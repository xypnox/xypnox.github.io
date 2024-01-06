
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
  hideNav?: boolean;
}
