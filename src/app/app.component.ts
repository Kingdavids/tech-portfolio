import { Component, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './shared/nav/nav.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { WorkComponent } from './work/work.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ScrollRevealDirective } from './shared/scroll-reveal.directive';
import { TextScrambleDirective } from './shared/text-scramble.directive';
import { CursorComponent } from './shared/cursor/cursor.component';
import { ScrollProgressComponent } from './shared/scroll-progress/scroll-progress.component';
import { ParallaxDirective } from './shared/parallax.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    WorkComponent,
    ContactsComponent,
    FooterComponent,
    ScrollRevealDirective,
    TextScrambleDirective,
    CursorComponent,
    ScrollProgressComponent,
    ParallaxDirective,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {
    // Belt-and-suspenders: index.html already sets history.scrollRestoration
    // to 'manual' so the browser never auto-restores a prior scroll position;
    // this guarantees every fresh load visually starts at the Home section.
    afterNextRender(() => window.scrollTo(0, 0));
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
