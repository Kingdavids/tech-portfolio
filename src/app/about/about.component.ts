import { Component, OnInit, OnDestroy } from '@angular/core';
import { Information } from '../interfaces/portfolio-revised';
import { CommonModule } from '@angular/common';

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
    skills: [
      "React", "Angular", "TypeScript", "Node.js", "Express.js", "REST APIs",
      "PostgreSQL", "SQL", "Spring Boot", "Java", "Linux Administration",
      "Cloud Computing", "Scalable Architecture",
    ],
    describe: "Hi, My name is Olumuyiwa David Ogunniyi, an innovative and detail-oriented junior Software Developer with a strong foundation in full-stack web development, system administration, and scalable application design. I specialize in building clean, responsive user experiences with Angular, React, TypeScript, and Material Design just like this one, complemented by hands-on experience in backend systems, database modeling, and Linux-based service configuration.\n" +
      "\n" +
      "My recent projects span a range of modern development challenges — from designing a minimalist Angular portfolio with custom routing and search filtering, to implementing secure services (FTP, NFS, Samba, Sendmail) in virtualized Linux environments. I’ve also led the development of normalized database models and RESTful APIs, contributing to efficient, maintainable codebases and cross-functional team collaboration.\n" +
      "\n" +
      "I'm passionate about turning complex ideas into intuitive digital experiences, and I'm always eager to explore emerging technologies that improve performance, accessibility, and maintainability."
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

  ngOnInit() {
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
