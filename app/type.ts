import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";

// Brand font info
export interface Font {
  name: string;
  headers?: string;
  weights?: number[];
  subsets?: string[];
}

// Brand section
export interface Brand {
  name: string;
  primaryColor: string;
  monoLogo?: string;
  monoLogoDark?: string;
  logo: string;
  darkLogo: string;
  font: Font;
}

// Menu structure
export interface MenuItem {
  id: string;
  title: string;
  type: string;
}

export interface MenuGroup {
  items: MenuItem[];
}

export interface Menu {
  [key: string]: MenuGroup;
}

// Section item details
export interface OverviewItems {
  MDXComponent?: string | MDXRemoteSerializeResult;
  group?: string;
  title: string | MDXRemoteSerializeResult;
  desc: string | MDXRemoteSerializeResult;
  img?: string;
  content?: [];
}

// Section structure
export interface Overview {
  type: string;
  title: string | MDXRemoteSerializeResult;
  description: string | MDXRemoteSerializeResult;
  pattern?: string;
  img?: string;
  video?: string;
  items: OverviewItems;
  style: number;
}

export type Section = Overview;

// Final response structure
export interface ApiResponse {
  brand: Brand;
  menu: Menu;
  sections: Section[];
}
