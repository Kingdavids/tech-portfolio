import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../interfaces/portfolio-revised';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url ='data/portfolio.json';
  private likedProjects: Set<string> = new Set();

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.url)
  }
  toggleLike(title: string): void {
    this.likedProjects.has(title)
      ? this.likedProjects.delete(title)
      : this.likedProjects.add(title);
  }

  isLiked(title: string): boolean {
    return this.likedProjects.has(title);
  }
}
