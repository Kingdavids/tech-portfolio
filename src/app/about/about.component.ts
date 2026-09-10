import { Component, OnInit, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { Information } from '../interfaces/portfolio-revised';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {
  info: Information = {
    name: "Muyiwa Davids",
    role: "Full Stack Developer",
    skillTiers: [
      {
        label: "Strong",
        skills: ["Angular", "React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
      },
      {
        label: "Working knowledge",
        skills: ["Node.js", "Express.js", "Java", "Spring Boot", "SQL", "PostgreSQL", "MySQL"],
      },
      {
        label: "Hands-on exposure",
        skills: ["AWS", "Azure", "Docker", "Terraform", "CI/CD"],
      },
      {
        label: "Systems",
        skills: ["Linux Administration", "Networking", "Service Configuration"],
      },
      {
        label: "Collaboration",
        skills: ["Slack", "Linear", "Jira", "Git"],
      },
    ],
    describe: "My name is Olumuyiwa David Ogunniyi. I'm a junior software developer with a background in full-stack web development, system administration, and application design. Most of my work is in Angular, React, TypeScript, and Material Design (this site included), plus backend systems, database modeling, and Linux-based service configuration.\n" +
      "\n" +
      "Recent projects include this Angular portfolio, with custom routing and search filtering, and a set of Linux services (FTP, NFS, Samba, Sendmail) configured and secured in virtualized environments. I've also built normalized database models and RESTful APIs, working across teams to keep the resulting codebases maintainable.\n" +
      "\n" +
      "Alongside my own projects, I contribute to product engineering at Averil, and I evaluate AI coding-agent output for Codex and Claude Code through G2i and DataAnnotation. That's changed how carefully I read someone else's code, which turns out to be a different skill from writing my own. I like turning a complicated idea into something people can use, and I keep an eye on new tools that make software faster, more accessible, or easier to maintain."
  };

  get bioParagraphs(): string[] {
    return this.info.describe.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  }

  // 🔄 Picture slideshow logic
  pictures: string[] = [
    '/images/profile-smile.jpg',
    '/images/profile-traditional.jpg',
  ];
  currentIndex = 0;
  currentPicture = this.pictures[0];
  intervalId?: ReturnType<typeof setInterval>;
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.intervalId = setInterval(() => {
      const container = document.querySelector('.profile-flip-container');
      if (container) {
        // Start flip
        container.classList.add('flip');

        // Midway (0.4s) swap the image
        setTimeout(() => {
          this.currentIndex = (this.currentIndex + 1) % this.pictures.length;
          this.currentPicture = this.pictures[this.currentIndex];
        }, 400); // halfway through flip

        // End flip
        setTimeout(() => container.classList.remove('flip'), 800);
      }
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
