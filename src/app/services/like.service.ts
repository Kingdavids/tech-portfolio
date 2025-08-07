import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class LikeService {
  private liked: Set<string> = new Set();

  toggleLike(title: string) {
    this.liked.has(title) ? this.liked.delete(title) : this.liked.add(title);
  }
  isLiked(title: string): boolean {
    return this.liked.has(title);
  }
}