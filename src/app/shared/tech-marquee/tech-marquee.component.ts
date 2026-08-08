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
    'Angular', 'React', 'TypeScript', 'Spring Boot', 'Java', 'Node.js',
    'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'Docker', 'Terraform', 'Linux', 'REST APIs',
  ];
}
