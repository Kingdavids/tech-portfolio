import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './shared/nav/nav.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
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
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
