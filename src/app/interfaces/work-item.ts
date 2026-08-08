export interface WorkItem {
  slug: string;
  category: 'Frontend' | 'Backend';
  title: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
  displayUrl: string;
  secure: boolean;
}
