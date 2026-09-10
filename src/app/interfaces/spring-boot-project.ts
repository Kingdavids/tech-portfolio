import { StarStory, WorkCategory } from './work-item';

export interface SpringBootProject {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  keyFeatures: string[];
  category: WorkCategory;
  year: string;
  screenshots: string[];
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  screenshotUrl?: string;
  highlights?: string[];
  academic?: boolean;
  priority?: number;
  star?: StarStory;
}
