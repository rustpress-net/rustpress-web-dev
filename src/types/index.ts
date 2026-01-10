export interface DocSection {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  items: DocItem[];
}

export interface DocItem {
  id: string;
  title: string;
  path: string;
  description?: string;
  children?: DocItem[];
}

export interface SearchResult {
  id: string;
  title: string;
  path: string;
  section: string;
  excerpt: string;
  relevance: number;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  code: string;
  description?: string;
  runnable?: boolean;
}
