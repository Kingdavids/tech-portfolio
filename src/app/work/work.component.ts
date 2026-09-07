import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { Project } from '../interfaces/portfolio-revised';
import { SpringBootProject } from '../interfaces/spring-boot-project';
import { WorkCategory, WorkItem } from '../interfaces/work-item';
import { ProjectService } from '../services/project.service';
import { SpringBootProjectService } from '../services/spring-boot-project.service';
import { TiltDirective } from '../shared/tilt.directive';

type Filter = 'All' | WorkCategory;

const DEFAULT_PRIORITY = 100;

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, TiltDirective],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent implements OnInit, AfterViewInit, OnDestroy {
  items: WorkItem[] = [];
  filteredItems: WorkItem[] = [];
  activeFilter: Filter = 'All';
  searchTerm = '';

  readonly filters: Filter[] = ['All', 'Frontend', 'Backend', 'Full-Stack', 'Cloud/DevOps', 'Desktop & CLI', 'Systems', 'Process'];

  @ViewChild('workListEl') private workListEl!: ElementRef<HTMLElement>;
  private revealObserver?: IntersectionObserver;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly safeUrlCache = new Map<string, SafeResourceUrl>();

  // Cards always render (both platforms); this only gates the CSS entrance
  // animation via a class on .work-list, so there's no structural hydration
  // mismatch risk between server and client.
  revealed = false;

  constructor(
    private projectService: ProjectService,
    private springBootProjectService: SpringBootProjectService
  ) {}

  ngOnInit(): void {
    forkJoin({
      frontend: this.projectService.getProjects(),
      backend: this.springBootProjectService.getProjects(),
    }).subscribe(({ frontend, backend }) => {
      this.items = [
        ...frontend.map(p => this.fromProject(p)),
        ...backend.map(p => this.fromSpringBootProject(p)),
      ].sort((a, b) => {
        const rankDiff = this.previewRank(a) - this.previewRank(b);
        return rankDiff !== 0 ? rankDiff : a.priority - b.priority;
      });
      this.applyFilters();
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.revealed = true;
          this.revealObserver?.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    this.revealObserver.observe(this.workListEl.nativeElement);
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  private fromProject(project: Project): WorkItem {
    const tools = Array.isArray(project.tools)
      ? project.tools
      : project.tools.split(',').map(t => t.trim()).filter(Boolean);
    return {
      slug: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: project.category,
      title: project.title,
      description: project.description,
      tags: tools,
      highlights: project.highlights ?? [],
      year: project.year,
      liveUrl: project.link,
      githubUrl: project.githubUrl,
      videoUrl: project.videoUrl,
      posterUrl: project.posterUrl,
      screenshotUrl: project.screenshotUrl,
      academic: !!project.academic,
      priority: project.priority ?? DEFAULT_PRIORITY,
    };
  }

  private fromSpringBootProject(project: SpringBootProject): WorkItem {
    return {
      slug: project.slug,
      category: project.category,
      title: project.title,
      description: project.description,
      tags: project.techStack,
      highlights: project.highlights ?? [],
      year: project.year,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      videoUrl: project.videoUrl,
      posterUrl: project.posterUrl,
      screenshotUrl: project.screenshotUrl,
      academic: !!project.academic,
      priority: project.priority ?? DEFAULT_PRIORITY,
    };
  }

  setFilter(filter: Filter): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  // Lower rank sorts first: live sites, then video demos, then screenshots, then no preview.
  private previewRank(item: WorkItem): number {
    if (item.liveUrl) return 0;
    if (item.videoUrl) return 1;
    if (item.screenshotUrl) return 2;
    return 3;
  }

  private applyFilters(): void {
    this.filteredItems = this.items.filter(item => {
      const matchesFilter = this.activeFilter === 'All' || item.category === this.activeFilter;
      const matchesSearch = item.title.toLowerCase().includes(this.searchTerm);
      return matchesFilter && matchesSearch;
    });
  }

  trackBySlug(index: number, item: WorkItem): string {
    return item.slug;
  }

  delayFor(i: number): string {
    return `${Math.min(i * 0.05, 0.3)}s`;
  }

  safeUrl(url: string): SafeResourceUrl {
    let safe = this.safeUrlCache.get(url);
    if (!safe) {
      safe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.safeUrlCache.set(url, safe);
    }
    return safe;
  }

  categoryClass(category: WorkCategory): string {
    return 'cat-' + category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  displayHost(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }
}
