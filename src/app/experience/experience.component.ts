import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../interfaces/experience';
import { TiltDirective } from '../shared/tilt.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  entries: Experience[] = [
    {
      company: 'Averil',
      role: 'Software Engineer, AI',
      location: 'Toronto, ON',
      dates: 'Sep 2025 to Present',
      stack: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'AI/LLM'],
      bullets: [
        "I build full-stack features for Averil's AI-powered product, across TypeScript apps and Python backend services.",
        'I help integrate AI capabilities into product workflows, turning application requirements into features people can use.',
        'I work with product and engineering on architecture, reliability and maintainability.',
        'On contract, I evaluate coding-agent output from Codex and Claude Code for correctness and write feedback that helps improve the models.',
      ],
    },
    {
      company: 'Cloud Enthusiast Hub',
      role: 'Software Engineer',
      location: 'Montreal, QC',
      dates: 'Aug 2024 to Aug 2025',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Material UI', 'REST APIs', 'Cloud Services'],
      bullets: [
        'I built responsive frontends for Foto-C and internal media-technology dashboards.',
        'I connected those interfaces to backend and cloud services for media processing and analytics.',
        'I built reusable UI components for the design system, and improved accessibility and frontend performance.',
        'I worked with product stakeholders to turn requirements into user flows.',
      ],
    },
    {
      company: 'Techsity',
      role: 'Software Engineer',
      location: 'Toronto, ON',
      dates: 'Aug 2023 to Jul 2024',
      stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Material UI', 'REST APIs'],
      bullets: [
        'I worked on LobeStack, an AI-powered marketing platform where businesses research their brands, generate content, schedule campaigns and analyze performance.',
        'I built full-stack product features with Next.js, Node.js and PostgreSQL, from user-facing workflows to backend services.',
        'I built reusable frontend components and connected them to backend APIs and third-party services for content generation and campaign management.',
      ],
    },
  ];
}
