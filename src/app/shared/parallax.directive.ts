import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements OnInit {
  @Input('appParallax') speed = 0.12;

  private ticking = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.update();
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
