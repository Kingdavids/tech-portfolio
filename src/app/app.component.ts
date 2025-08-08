import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Information } from './interfaces/portfolio-revised';
import { Project } from './interfaces/portfolio-revised';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter, :leave', style({ position: 'absolute', width: '100%' }), {
        optional: true
      }),
      group([
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ], { optional: true }),
        query(':leave', [
          style({ opacity: 1, transform: 'translateY(0)' }),
          animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
        ], { optional: true })
      ])
    ])
  ])
  ]
})
export class AppComponent {
  info: Information = {
    name: "Muyiwa Davids",
    role: "Full Stack Developer & Media Personnel",
    skills: "Full-Stack Developer | React • Angular • REST APIs • SQL | Linux Systems Admin | Hands-On with Real-World Projects & Scalable Architecture | Computer Programming Student @ Sheridan College | Multiple Certification",
    describe: ""
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }


  isDark = localStorage.getItem('darkTheme') === 'true';

  ngOnInit() {
    // Apply saved theme on init
    document.body.classList.toggle('dark-theme', this.isDark);
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme', this.isDark);
    localStorage.setItem('darkTheme', this.isDark.toString());
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

