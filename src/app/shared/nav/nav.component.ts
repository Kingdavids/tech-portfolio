import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  Signal,
  ViewChildren,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSpyService } from '../scroll-spy.service';
import { scrollToSection } from '../scroll.util';
import { MagneticDirective } from '../magnetic.directive';

interface NavSection {
  id: string;
  label: string;
}

interface IndicatorState {
  left: number;
  width: number;
  ready: boolean;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, MagneticDirective],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements AfterViewInit {
  readonly sections: NavSection[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ];

  scrolled = false;
  activeSection: Signal<string>;
  indicator = signal<IndicatorState>({ left: 0, width: 0, ready: false });

  @ViewChildren('navItem') private navItemEls!: QueryList<ElementRef<HTMLElement>>;

  constructor(private scrollSpy: ScrollSpyService) {
    this.activeSection = this.scrollSpy.activeSection;
    effect(() => {
      this.activeSection();
      this.positionIndicator();
    });
  }

  ngAfterViewInit(): void {
    this.scrollSpy.observeSections(this.sections.map(s => s.id));
    window.addEventListener('resize', () => this.positionIndicator());
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 40;
  }

  onNavClick(id: string): void {
    this.scrollSpy.activeSection.set(id);
    scrollToSection(id);
  }

  private positionIndicator(): void {
    if (!this.navItemEls) return;
    const idx = this.sections.findIndex(s => s.id === this.activeSection());
    const el = this.navItemEls.toArray()[idx]?.nativeElement;
    if (!el) return;
    this.indicator.set({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }
}
