import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { information } from './interfaces/portfolio-revised';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  info: information = {
    name: "Muyiwa Davids",
    role: "Full Stack Developer & Media Personnel",
    skills: "Full-Stack Developer | React • Angular • REST APIs • SQL | Linux Systems Admin | Hands-On with Real-World Projects & Scalable Architecture | Computer Programming Student @ Sheridan College | Multiple Certification",
    describe: ""
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

