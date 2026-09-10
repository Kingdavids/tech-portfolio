export type WorkCategory = 'Frontend' | 'Backend' | 'Full-Stack' | 'Cloud/DevOps' | 'Desktop & CLI' | 'Systems' | 'Process';

export interface StarStory {
  situation: string;
  task: string;
  action: string;
  result: string;
}

export interface WorkItem {
  slug: string;
  category: WorkCategory;
  title: string;
  description: string;
  tags: string[];
  highlights: string[];
  year: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  screenshotUrl?: string;
  academic: boolean;
  priority: number;
  /** Skip the live iframe preview (e.g. liveUrl points back at this same site). */
  noEmbed?: boolean;
  star?: StarStory;
}
