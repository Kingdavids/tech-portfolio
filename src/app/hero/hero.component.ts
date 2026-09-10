import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { scrollToSection } from '../shared/scroll.util';
import { TechMarqueeComponent } from '../shared/tech-marquee/tech-marquee.component';
import { TextScrambleDirective } from '../shared/text-scramble.directive';
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
  imports: [CommonModule, TechMarqueeComponent, TextScrambleDirective, MagneticDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  name = 'Muyiwa Davids';
  role = 'Full-Stack Developer';
  tagline = 'I build clean, scalable web applications, from Angular and React front ends to Spring Boot and Node backends, with a focus on real-world, production-ready systems.';

  stats: Stat[] = [
    { target: 9, suffix: '+', display: '9+', label: 'Projects shipped' },
    { target: 6, suffix: '', display: '6', label: 'Spring Boot systems' },
    { target: 10, suffix: '+', display: '10+', label: 'Technologies' },
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
