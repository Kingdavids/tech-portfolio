import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.component.html',
  styleUrl: './cursor.component.css'
})
export class CursorComponent {
  x = 0;
  y = 0;
  isHovering = false;
  isVisible = false;

  @HostListener('document:mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    this.x = event.clientX;
    this.y = event.clientY;
    this.isVisible = true;
  }

  @HostListener('document:mouseover', ['$event'])
  onOver(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    this.isHovering = !!target.closest(
      'a, button, .nav-item, [appTilt], input, textarea, .scroll-top, .logo'
    );
  }

  @HostListener('document:mouseleave')
  onLeaveWindow(): void {
    this.isVisible = false;
  }
}
