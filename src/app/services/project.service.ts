import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../interfaces/portfolio-revised';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Live data: edit at https://gist.github.com/Kingdavids/5814bf165653aac95f3eab69296e663f
  // and it's picked up on next page load, no rebuild or redeploy needed.
  private liveUrl = 'https://gist.githubusercontent.com/Kingdavids/5814bf165653aac95f3eab69296e663f/raw/portfolio.json';
  // Bundled fallback in case the gist is ever unreachable -- not auto-synced
  // with the gist, so treat it as a safety net rather than the source of truth.
  private fallbackUrl = 'data/portfolio.json';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.liveUrl).pipe(
      catchError(() => this.http.get<Project[]>(this.fallbackUrl))
    );
  }
}
