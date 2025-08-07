import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LikeService } from '../services/like.service';
import { projects } from '../interfaces/portfolio-revised';
import { HttpClient } from '@angular/common/http';
import {PROJECT_LIST} from '../data/project-data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  styles: [`.liked { color: red; font-weight: bold; }`]
})
export class ProjectsComponent {
  private http =inject(HttpClient);
  projects: projects[] = [
    { title: 'Teams Alerting System', description: 'Integrated alerts to Teams from pipelines', tools: 'Azure, Teams', year: 2025, url:"" },
    { title: 'Sax Made Easy Website', description: 'Figma design to HTML/CSS website', tools: 'HTML, CSS', year: 2024, url:"" },
    { title: 'Countries Web', description: 'Web to explore countries', tools: 'Nodejs, MySQL', year: 2025, url:"" },
    { title: 'Crazy Eights Game', description: 'Java OOP card game', tools: 'Java', year: 2025, url:"" },
    { title: 'Ovbiedo App', description: 'CloudOps for Edo community app', tools: 'AWS, Azure, Docker', year: 2025, url:"" },
    { title: 'Portfolio', description: 'This very portfolio site', tools: 'Angular', year: 2025, url:"" },
    { title: 'Media Portfolio', description: 'I developed a media portfolio using React, styled with Tailwind CSS, hosted it on Amplify.',
      tools: 'Tailwind CSS, React, AWS, Amplify, Postman, Figma',
      year: 2025, url: 'https://media.muyiwadavids.com'}
  ];

  searchTerm = '';
  filteredData = PROJECT_LIST;
  constructor(public likeService: LikeService) {}
  toggleLike(title: string) { this.likeService.toggleLike(title); }
  isLiked(title: string): boolean { return this.likeService.isLiked(title); }
  filterProjects() {
    const term = this.searchTerm.toLowerCase();
    this.filteredData = term ? this.projects.filter(p => p.title.toLowerCase().includes(term)) : [...this.projects];
  }

  trackByProject(index: number, item: projects) {
    return item.title;
  }

  ngOnInit() {
    this.http.get<any[]>('data/portfolio.json').subscribe(data => {
      this.projects = data;
    });
  }}
