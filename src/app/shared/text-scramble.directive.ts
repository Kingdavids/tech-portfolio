import { Directive, ElementRef, OnDestroy, afterNextRender } from '@angular/core';

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#$%&01';

@Directive({
  selector: '[appScramble]',
  standalone: true
})
export class TextScrambleDirective implements OnDestroy {
  private observer?: IntersectionObserver;
  private intervalId?: ReturnType<typeof setInterval>;

  constructor(private el: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      const finalText = this.el.nativeElement.textContent ?? '';
      if (!finalText.trim()) return;

      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.scramble(finalText);
            this.observer?.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private scramble(finalText: string): void {
    const totalFrames = 22;
    const reveal = finalText.split('').map((ch, i) =>
      ch === ' ' ? -1 : Math.floor((i / finalText.length) * totalFrames) + Math.random() * 5
    );
    let frame = 0;

    this.intervalId = setInterval(() => {
      let output = '';
      let done = true;
      for (let i = 0; i < finalText.length; i++) {
        const ch = finalText[i];
        if (ch === ' ') {
          output += ' ';
          continue;
        }
        if (frame >= reveal[i]) {
          output += ch;
        } else {
          output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          done = false;
        }
      }
      this.el.nativeElement.textContent = output;
      frame++;
      if (done || frame > totalFrames + 8) {
        this.el.nativeElement.textContent = finalText;
        if (this.intervalId) clearInterval(this.intervalId);
      }
    }, 32);
  }
}
