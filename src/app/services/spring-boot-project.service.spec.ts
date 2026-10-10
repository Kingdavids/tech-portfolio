import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SpringBootProjectService } from './spring-boot-project.service';
import { SpringBootProject } from '../interfaces/spring-boot-project';

const project = (title: string): SpringBootProject => ({
  slug: title.toLowerCase(),
  title,
  tagline: '',
  description: '',
  techStack: [],
  keyFeatures: [],
  category: 'Backend',
  year: '2026',
  screenshots: [],
});

describe('SpringBootProjectService', () => {
  let service: SpringBootProjectService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(SpringBootProjectService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('returns the live data when the gist responds', () => {
    let result: SpringBootProject[] = [];
    service.getProjects().subscribe(projects => (result = projects));

    http
      .expectOne(req => req.url.endsWith('/spring-boot-projects.json') && req.url.includes('gist.githubusercontent.com'))
      .flush([project('Live')]);

    expect(result.map(p => p.title)).toEqual(['Live']);
  });

  it('falls back to the bundled file when the gist is unreachable', () => {
    let result: SpringBootProject[] = [];
    service.getProjects().subscribe(projects => (result = projects));

    http
      .expectOne(req => req.url.includes('gist.githubusercontent.com'))
      .error(new ProgressEvent('error'));
    http.expectOne('data/spring-boot-projects.json').flush([project('Bundled')]);

    expect(result.map(p => p.title)).toEqual(['Bundled']);
  });
});
