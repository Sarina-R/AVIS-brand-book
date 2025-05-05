import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";

// Brand
export interface Color {
  primaryColor: string;
  secondaryColor: string;
  actionColor: string;
  otherColors: string[];
}

export interface Font {
  name: string;
  headers?: string;
  weights?: number[];
  subsets?: string[];
}

export interface Brand {
  name: string;
  primaryColor: string;
  monoLogo?: string;
  monoLogoDark?: string;
  logo: string;
  darkLogo: string;
  font: Font;
  color: Color;
}

// Menu
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

// Home page
export interface HomePageSection {
  title: string;
  href?: string;
  type?: string;
  desc: string;
  lightImg?: string;
  darkImg?: string;
}

// overview
export interface OverviewItems {
  MDXComponent?: string | MDXRemoteSerializeResult;
  group?: string;
  title: string | MDXRemoteSerializeResult;
  desc: string | MDXRemoteSerializeResult;
  img?: string;
  content?: [];
}

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

// section
export type Section = Overview;

// ApiResponse
export interface ApiResponse {
  brand: Brand;
  menu: Menu;
  visualSectionCards: HomePageSection[];
  sections: Section[];
}
