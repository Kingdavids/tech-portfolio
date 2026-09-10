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
      role: 'Software Product Engineer',
      location: 'Ontario / Remote',
      dates: 'Sep 2025 – Present',
      bullets: [
        'I work across the stack at Averil: responsive web interfaces, backend integrations, and the deployment pipeline, on a small cross-functional product team.',
        "I turn product requirements into features that hold up over time, and I pay attention to usability, how data moves through them, and how reliably they run once they're live.",
      ],
    },
    {
      company: 'DataAnnotation',
      role: 'AI Coding Evaluator (Contract)',
      location: 'Remote',
      dates: 'Jun 2026',
      bullets: [
        'Similar work to G2i: reviewing coding-agent output for systems including Codex and Claude Code, checking for correctness and whether the agent did what it was asked.',
        'I flagged implementation problems, compared competing solutions, and wrote feedback aimed at improving the model, past a simple right-or-wrong mark.',
      ],
    },
    {
      company: 'G2i',
      role: 'AI Coding Evaluator (Contract)',
      location: 'Remote',
      dates: 'May 2026',
      bullets: [
        'I evaluated coding-agent output and developer interactions for systems like Codex and Claude Code, mainly checking whether the code was correct, whether it followed the instructions it was given, and whether the explanation was useful.',
        'That meant applying my own engineering judgment: catching implementation issues, weighing one solution against another, and writing feedback specific enough for the model to learn from.',
      ],
    },
    {
      company: 'Gemeaux World Global Resources',
      role: 'Media-TechOps / DevOps Intern',
      location: 'Montréal / Remote',
      dates: 'Aug 2024 – Aug 2025',
      bullets: [
        "I supported the company's media-technology infrastructure through DevOps, site reliability, and security-focused operational work.",
        'I worked with product and infrastructure stakeholders to keep services deployment-ready and operations running dependably.',
      ],
    },
  ];
}
