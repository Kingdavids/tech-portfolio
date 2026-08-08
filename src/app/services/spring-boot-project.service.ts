import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpringBootProject } from '../interfaces/spring-boot-project';

@Injectable({
  providedIn: 'root'
})
export class SpringBootProjectService {
  private url = 'data/spring-boot-projects.json';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<SpringBootProject[]> {
    return this.http.get<SpringBootProject[]>(this.url);
  }
}
