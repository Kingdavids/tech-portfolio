import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SpringBootProject } from '../interfaces/spring-boot-project';

@Injectable({
  providedIn: 'root'
})
export class SpringBootProjectService {
  // Live data: edit at https://gist.github.com/Kingdavids/5814bf165653aac95f3eab69296e663f
  // and it's picked up on next page load, no rebuild or redeploy needed.
  private liveUrl = 'https://gist.githubusercontent.com/Kingdavids/5814bf165653aac95f3eab69296e663f/raw/spring-boot-projects.json';
  // Bundled fallback in case the gist is ever unreachable -- not auto-synced
  // with the gist, so treat it as a safety net rather than the source of truth.
  private fallbackUrl = 'data/spring-boot-projects.json';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<SpringBootProject[]> {
    return this.http.get<SpringBootProject[]>(this.liveUrl).pipe(
      catchError(() => this.http.get<SpringBootProject[]>(this.fallbackUrl))
    );
  }
}
