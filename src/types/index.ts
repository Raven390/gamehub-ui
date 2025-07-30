export interface NewsItem {
  id: number;
  title: string;
  date: string; // ISO or string
  description: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  owner: string;
  description: string;
}