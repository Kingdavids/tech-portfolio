import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  templateUrl: './scroll-progress.component.html',
  styleUrl: './scroll-progress.component.css'
})
export class ScrollProgressComponent {
  progress = 0;

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    this.progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  }
}
