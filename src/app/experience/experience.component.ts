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
      bullets: [
        'Contribute to product engineering across responsive web interfaces, backend integrations, and deployment workflows in a cross-functional environment.',
        'Translate product requirements into maintainable features while balancing usability, data flow, and operational reliability.',
      ],
    },
    {
      company: 'G2i',
      role: 'AI Coding Evaluator — Contract',
      location: 'Remote',
      bullets: [
        'Evaluated coding-agent outputs and developer interactions for systems including Codex and Claude Code, focusing on correctness, instruction following, and useful technical communication.',
        'Applied software-engineering judgment to identify implementation issues, compare solution quality, and provide structured feedback for AI model improvement.',
      ],
    },
    {
      company: 'DataAnnotation',
      role: 'AI Coding Evaluator — Contract',
      location: 'Remote',
      bullets: [
        'Evaluated coding-agent outputs and developer interactions for systems including Codex and Claude Code, focusing on correctness, instruction following, and useful technical communication.',
        'Applied software-engineering judgment to identify implementation issues, compare solution quality, and provide structured feedback for AI model improvement.',
      ],
    },
    {
      company: 'Gemeaux World Global Resources',
      role: 'Media-TechOps / DevOps Intern',
      location: 'Montréal / Remote',
      bullets: [
        'Supported the media-technology infrastructure vision through DevOps, site reliability, and security-oriented operational work.',
        'Collaborated with product and infrastructure stakeholders on service readiness, deployment processes, and dependable technical operations.',
      ],
    },
  ];
}
