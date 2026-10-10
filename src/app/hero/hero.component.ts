import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { scrollToSection } from '../shared/scroll.util';
import { TechMarqueeComponent } from '../shared/tech-marquee/tech-marquee.component';
import { MagneticDirective } from '../shared/magnetic.directive';

interface Stat {
  target: number;
  suffix: string;
  display: string;
  label: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TechMarqueeComponent, MagneticDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  name = 'Olumuyiwa David Ogunniyi';
  role = 'Software Engineer | Full-Stack & AI-Enabled Applications';
  tagline = 'I build and maintain real-world software, from user-facing applications to backend APIs, databases, and cloud deployment. My work spans React, TypeScript, Node.js, Python, and AI-assisted engineering, with a focus on making software reliable and useful.';

  specs = [
    { icon: '🖥️', label: 'React / TypeScript' },
    { icon: '⚙️', label: 'Backend APIs' },
    { icon: '☁️', label: 'Cloud' },
    { icon: '✨', label: 'AI Tooling' },
  ];

  stats: Stat[] = [
    { target: 3, suffix: '+', display: '3+', label: 'Years of experience' },
    { target: 3, suffix: '', display: '3', label: 'Client systems live' },
    { target: 3, suffix: '', display: '3', label: 'Product teams joined' },
  ];

  private statsObserver?: IntersectionObserver;
  private readonly platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const statRow = this.el.nativeElement.querySelector('.stat-tiles');
    if (!statRow) return;
    this.statsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animateStats();
          this.statsObserver?.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    this.statsObserver.observe(statRow);
  }

  ngOnDestroy(): void {
    this.statsObserver?.disconnect();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.el.nativeElement.style.setProperty('--parallax-x', `${x * 30}px`);
    this.el.nativeElement.style.setProperty('--parallax-y', `${y * 30}px`);
  }

  private animateStats(): void {
    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      for (const stat of this.stats) {
        stat.display = Math.round(stat.target * eased) + stat.suffix;
      }
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  scrollTo(id: string): void {
    scrollToSection(id);
  }
}
