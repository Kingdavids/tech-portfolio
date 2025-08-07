import { Component, Input } from '@angular/core';
import { information } from '../interfaces/portfolio-revised';
import { CommonModule} from '@angular/common';
import { MaterialModule} from '../modules/material-ui.module';
import {NgModule} from '@angular/core';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  info: information = {
    name: "Muyiwa Davids",
    role: "Full Stack Developer",
    skills: "React • Angular • REST APIs • SQL | Linux Systems Admin | Hands-On with Real-World Projects & Scalable Architecture | Computer Programming Student @ Sheridan College | Multiple Certification",
    describe: "Hi, My name is Olumuyiwa David Ogunniyi, currently a student of Computer programming at Sheridan College, I'm an innovative and detail-oriented junior Software Developer with a strong foundation in full-stack web development, system administration, and scalable application design. I specialize in building clean, responsive user experiences with Angular, React, TypeScript, and Material Design just like this one, complemented by hands-on experience in backend systems, database modeling, and Linux-based service configuration.\n" +
      "\n" +
      "My recent projects span a range of modern development challenges — from designing a minimalist Angular portfolio with custom routing and search filtering, to implementing secure services (FTP, NFS, Samba, Sendmail) in virtualized Linux environments. I’ve also led the development of normalized database models and RESTful APIs, contributing to efficient, maintainable codebases and cross-functional team collaboration.\n" +
      "\n" +
      "I'm passionate about turning complex ideas into intuitive digital experiences, and I'm always eager to explore emerging technologies that improve performance, accessibility, and maintainability."

  }
}
