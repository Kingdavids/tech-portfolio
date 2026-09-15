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
      dates: 'Sep 2025 – Present',
      bullets: [
        "I contribute to Averil's AI-powered product experiences, working across application functionality, backend services, and user-facing features, building and maintaining full-stack functionality across modern JavaScript/TypeScript apps and Python-based backend services.",
        'I support the integration of AI capabilities into product workflows, and collaborate with product and engineering to improve architecture, reliability, maintainability, and the overall user experience.',
        'Alongside that, I work part-time as an AI coding evaluator on contract, annotating and reviewing coding-agent output from systems like Codex and Claude Code for correctness and writing feedback aimed at improving the models.',
      ],
    },
    {
      company: 'Cloud Enthusiast Hub',
      role: 'Software Engineer',
      location: 'Montreal, QC',
      dates: 'Aug 2024 – Aug 2025',
      bullets: [
        'I built responsive frontend experiences for Foto-C and internal media-technology dashboards using React, TypeScript, Tailwind CSS, and Material UI, and integrated those components with backend and cloud services supporting media-processing and analytics workflows.',
        'I developed reusable UI components and contributed to the application design system, and improved usability through accessibility enhancements, responsive design, and frontend performance work, partnering with product stakeholders to translate requirements into intuitive user flows.',
      ],
    },
    {
      company: 'Techsity',
      role: 'Software Engineer',
      location: 'Toronto, ON',
      dates: 'Aug 2023 – Jul 2024',
      bullets: [
        'I contributed to LobeStack, an AI-powered marketing intelligence platform that helps businesses research their brands, generate marketing content, schedule campaigns, and analyze performance across digital channels, building full-stack product features with Next.js, TypeScript, Node.js, and PostgreSQL.',
        'I developed reusable frontend components and application flows for marketing workflows, integrated them with backend APIs and third-party services for content generation and campaign management, and worked with product and engineering to turn requirements into production-ready features.',
      ],
    },
  ];
}
