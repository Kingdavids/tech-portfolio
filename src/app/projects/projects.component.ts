// src/app/projects/projects.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Information } from '../interfaces/portfolio-revised';
import { LikeService } from '../services/like.service';
import { Project } from '../interfaces/portfolio-revised';
import { ProjectService } from '../services/project.service';
import { Contact } from '../interfaces/portfolio-revised';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  styles: [`.liked { color: red; font-weight: bold; }`]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  searchTerm = '';
  likedProjects: string[] =[];

  constructor(
    private projectService: ProjectService,
    private likeService: LikeService
  ){}

  ngOnInit() {
    this.projectService.getProjects().subscribe((data:Project[]) => {
      this.projects = data;
      this.filteredProjects = data;
    });
    this.likedProjects = this.likeService.getLikedProjects();
  }

  filterProjects(event: Event): void {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredProjects = this.projects.filter(project =>
      project.title.toLowerCase().includes(input)
    );
  }

  trackByTitle(index: number, project: Project): string {
    return project.title;
  }

  isToolsArray(tools: string[] | string): boolean {
    return Array.isArray(tools);
  }

  getJoinedTools(tools: string[] | string): string {
    return Array.isArray(tools) ? tools.join(', ') : tools;
  }
  toggleLike(projectTitle: string): void {
    this.likeService.toggleLike(projectTitle);
    this.likedProjects = this.likeService.getLikedProjects();
  }

  isLiked(projectTitle: string): boolean {
    return this.likedProjects.includes(projectTitle);
  }
}
