import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from '../interfaces/portfolio-revised';

const project = (title: string): Project => ({
  title,
  description: '',
  tools: [],
  category: 'Frontend',
  year: '2026',
});

describe('ProjectService', () => {
  let service: ProjectService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(ProjectService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('returns the live data when the gist responds', () => {
    let result: Project[] = [];
    service.getProjects().subscribe(projects => (result = projects));

    http
      .expectOne(req => req.url.includes('gist.githubusercontent.com') && req.url.endsWith('/portfolio.json'))
      .flush([project('Live')]);

    expect(result.map(p => p.title)).toEqual(['Live']);
  });

  it('falls back to the bundled file when the gist is unreachable', () => {
    let result: Project[] = [];
    service.getProjects().subscribe(projects => (result = projects));

    http
      .expectOne(req => req.url.includes('gist.githubusercontent.com'))
      .error(new ProgressEvent('error'));
    http.expectOne('data/portfolio.json').flush([project('Bundled')]);

    expect(result.map(p => p.title)).toEqual(['Bundled']);
  });
});
