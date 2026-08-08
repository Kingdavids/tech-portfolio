import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { forkJoin } from 'rxjs';
import { Project } from '../interfaces/portfolio-revised';
import { SpringBootProject } from '../interfaces/spring-boot-project';
import { WorkItem } from '../interfaces/work-item';
import { ProjectService } from '../services/project.service';
import { SpringBootProjectService } from '../services/spring-boot-project.service';
import { coverGradient, coverMonogram } from '../shared/cover-art.util';
import { TiltDirective } from '../shared/tilt.directive';

const BACKEND_DEV_URLS: Record<string, string> = {
  'corporate-forum': 'http://localhost:8080',
  'novacore-forum': 'https://localhost:8443',
  'thymeleaf-fragments-demo': 'http://localhost:8080',
  'role-based-auth-demo': 'https://localhost:8443',
  'in-memory-auth-demo': 'http://localhost:8080',
  'book-haven': 'http://localhost:8080',
};

type Filter = 'All' | 'Frontend' | 'Backend';

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
  revealed = false;

  readonly filters: Filter[] = ['All', 'Frontend', 'Backend'];

  @ViewChild('workListEl') private workListEl!: ElementRef<HTMLElement>;
  private revealObserver?: IntersectionObserver;

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
      ];
      this.applyFilters();
    });
  }

  ngAfterViewInit(): void {
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
      slug: project.title,
      category: 'Frontend',
      title: project.title,
      description: project.description,
      tags: tools,
      year: project.year,
      link: project.link,
      displayUrl: this.hostnameFor(project),
      secure: !!project.link && project.link.startsWith('https://'),
    };
  }

  private fromSpringBootProject(project: SpringBootProject): WorkItem {
    const url = BACKEND_DEV_URLS[project.slug] ?? 'http://localhost:8080';
    return {
      slug: project.slug,
      category: 'Backend',
      title: project.title,
      description: project.tagline,
      tags: project.techStack,
      year: project.year,
      link: undefined,
      displayUrl: url,
      secure: url.startsWith('https://'),
    };
  }

  private hostnameFor(project: Project): string {
    if (project.link) {
      try {
        return new URL(project.link).hostname;
      } catch {
        return project.link;
      }
    }
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `localhost:4200/${slug}`;
  }

  setFilter(filter: Filter): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
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

  coverGradient(slug: string): string {
    return coverGradient(slug);
  }

  coverMonogram(title: string): string {
    return coverMonogram(title);
  }
}
