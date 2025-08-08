// src/app/interfaces/portfolio-revised.ts

export interface Information {
  name: string;
  role: string;
  skills: string;
  describe: string;
}

export interface Contact {
  social: string;
  icon: string;
  url: string;
}

export interface Project {
  title: string;
  description: string;
  tools: string | string[];
  year: string;
  link?: string;
  liked: boolean;
}
