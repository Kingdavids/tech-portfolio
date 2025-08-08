import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class LikeService {
  private likedProjects: string[] = [];

  toggleLike(projectTitle: string): void {
    const index = this.likedProjects.indexOf(projectTitle);
    if (index === -1) {
      this.likedProjects.push(projectTitle);
    } else {
      this.likedProjects.splice(index, 1);
    }
  }

  getLikedProjects(): string[] {
    return this.likedProjects;
  }
}
