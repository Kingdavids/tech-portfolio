import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-marquee.component.html',
  styleUrl: './tech-marquee.component.css'
})
export class TechMarqueeComponent {
  stack = [
    'React', 'Next.js', 'Angular', 'TypeScript', 'Python', 'FastAPI', 'Node.js',
    'PostgreSQL', 'Supabase', 'LLM Integration', 'RAG', 'AWS', 'Docker', 'Spring Boot', 'REST APIs',
  ];
}
