import { TestBed } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { WorkComponent } from './work.component';
import { ProjectService } from '../services/project.service';
import { SpringBootProjectService } from '../services/spring-boot-project.service';
import { Project } from '../interfaces/portfolio-revised';
import { SpringBootProject } from '../interfaces/spring-boot-project';

const project = (overrides: Partial<Project>): Project => ({
  title: 'Project',
  description: 'Description',
  tools: ['Angular'],
  category: 'Frontend',
  year: '2026',
  ...overrides,
});

const backendProject = (overrides: Partial<SpringBootProject>): SpringBootProject => ({
  slug: 'backend',
  title: 'Backend',
  tagline: '',
  description: 'Description',
  techStack: ['Spring Boot'],
  keyFeatures: [],
  category: 'Backend',
  year: '2026',
  screenshots: [],
  ...overrides,
});

function setup(frontend: Project[], backend: SpringBootProject[] = []) {
  TestBed.configureTestingModule({
    imports: [WorkComponent],
    providers: [
      { provide: ProjectService, useValue: { getProjects: () => of(frontend) } },
      { provide: SpringBootProjectService, useValue: { getProjects: () => of(backend) } },
    ],
  });
  const fixture = TestBed.createComponent(WorkComponent);
  fixture.detectChanges();
  return fixture;
}

const titles = (fixture: ReturnType<typeof setup>): string[] =>
  Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.work-title')).map(el => el.textContent!.trim());

describe('WorkComponent', () => {
  it('opens on the Featured filter and shows only featured projects', () => {
    const fixture = setup([
      project({ title: 'Featured one', featured: true }),
      project({ title: 'Other' }),
    ]);

    expect(fixture.componentInstance.activeFilter).toBe('Featured');
    expect(titles(fixture)).toEqual(['Featured one']);
  });

  it('falls back to All when no project is featured', () => {
    const fixture = setup([project({ title: 'One' }), project({ title: 'Two' })]);

    expect(fixture.componentInstance.activeFilter).toBe('All');
    expect(titles(fixture).length).toBe(2);
  });

  it('sorts academic projects after professional ones', () => {
    const fixture = setup([
      project({ title: 'Class project', academic: true, screenshotUrl: 'images/a.jpg', priority: 1 }),
      project({ title: 'Client work', priority: 50 }),
    ]);

    expect(titles(fixture)).toEqual(['Client work', 'Class project']);
  });

  it('filters by category and by search text', () => {
    const fixture = setup(
      [project({ title: 'Landing page' }), project({ title: 'Booking app', category: 'Full-Stack' })],
      [backendProject({ title: 'Forum' })],
    );

    fixture.componentInstance.setFilter('Full-Stack');
    fixture.detectChanges();
    expect(titles(fixture)).toEqual(['Booking app']);

    fixture.componentInstance.setFilter('All');
    fixture.componentInstance.onSearch({ target: { value: 'forum' } } as unknown as Event);
    fixture.detectChanges();
    expect(titles(fixture)).toEqual(['Forum']);
  });

  it('shows the empty state only after the data has loaded', () => {
    const frontend$ = new Subject<Project[]>();
    const backend$ = new Subject<SpringBootProject[]>();
    TestBed.configureTestingModule({
      imports: [WorkComponent],
      providers: [
        { provide: ProjectService, useValue: { getProjects: () => frontend$ } },
        { provide: SpringBootProjectService, useValue: { getProjects: () => backend$ } },
      ],
    });
    const fixture = TestBed.createComponent(WorkComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.empty-state')).toBeNull();

    frontend$.next([]);
    frontend$.complete();
    backend$.next([]);
    backend$.complete();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.empty-state')).not.toBeNull();
  });
});
