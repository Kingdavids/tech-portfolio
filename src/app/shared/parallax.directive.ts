import { Directive, ElementRef, HostListener, Input, afterNextRender } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective {
  @Input('appParallax') speed = 0.12;

  private ticking = false;

  constructor(private el: ElementRef<HTMLElement>) {
    afterNextRender(() => this.update());
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.update();
      this.ticking = false;
    });
  }

  private update(): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elCenter = rect.top + rect.height / 2;
    const offset = (viewportCenter - elCenter) * this.speed;
    this.el.nativeElement.style.transform = `translateY(${offset}px)`;
  }
}
