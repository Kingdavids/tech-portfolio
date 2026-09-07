// src/app/interfaces/portfolio-revised.ts

import { WorkCategory } from './work-item';

export interface SkillTier {
  label: string;
  skills: string[];
}

export interface Information {
  name: string;
  role: string;
  skillTiers: SkillTier[];
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
  category: WorkCategory;
  year: string;
  link?: string;
  githubUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  screenshotUrl?: string;
  highlights?: string[];
  academic?: boolean;
  priority?: number;
}
