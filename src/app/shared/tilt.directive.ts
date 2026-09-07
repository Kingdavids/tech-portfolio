import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  private readonly maxTilt = 5;

  @Input('appTiltLift') liftPx = 6;
  @Input('appTiltScale') hoverScale = 1;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * this.maxTilt * 2;
    const rotateY = (x - 0.5) * this.maxTilt * 2;

    this.el.nativeElement.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${this.liftPx}px) scale(${this.hoverScale})`;
    this.el.nativeElement.style.setProperty('--glow-x', `${x * 100}%`);
    this.el.nativeElement.style.setProperty('--glow-y', `${y * 100}%`);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.el.nativeElement.style.transform = '';
  }
}
