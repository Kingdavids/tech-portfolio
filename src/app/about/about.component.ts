import { Component } from '@angular/core';
import { Information } from '../interfaces/portfolio-revised';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  info: Information = {
    name: "Muyiwa Davids",
    role: "Software Engineer",
    skillTiers: [
      {
        label: "Strong",
        skills: ["Angular", "React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS"],
      },
      {
        label: "Working knowledge",
        skills: ["Node.js", "Express.js", "Nest.js", "Python", "FastAPI", "Pydantic", "Java", "Spring Boot", "GraphQL", "SQL", "PostgreSQL", "MySQL", "DynamoDB", "Redis", "Redux", "Zustand"],
      },
      {
        label: "AI & ML",
        skills: ["LLM Integration (OpenAI, Claude)", "RAG", "Agentic AI", "Tool & Function Calling", "Vector Search", "Embeddings", "Semantic Retrieval", "Two-Tower Retrieval Models", "Prompt Engineering", "Evaluation Pipelines"],
      },
      {
        label: "Testing & Automation",
        skills: ["Jest", "Mocha", "Selenium", "Playwright", "Puppeteer"],
      },
      {
        label: "Hands-on exposure",
        skills: ["AWS (Amplify, EC2, SES)", "Azure", "Docker", "Terraform", "CI/CD", "GitHub Actions", "Jenkins"],
      },
      {
        label: "Systems",
        skills: ["Linux Administration", "Networking", "Service Configuration"],
      },
      {
        label: "Collaboration",
        skills: ["Slack", "Linear", "Jira", "Git"],
      },
    ],
    describe: "My name is Olumuyiwa David Ogunniyi. I'm a software engineer with 3+ years of experience building production web applications and AI-powered products. I work mostly in React, Next.js, Angular, TypeScript and Python, and I'm at Averil now, building full-stack features and bringing AI into product workflows.\n" +
      "\n" +
      "Outside my job I build systems for clients, and three of them are live. Jigzack Cleaning Services runs customer signup, pickup scheduling, invoicing and payments for a waste collection company in Lagos and Port Harcourt. Royalway Christian Centre takes venue bookings and Stripe deposits online. Adisah African Store, a grocer in Maryland, lets customers send an order list over WhatsApp.\n" +
      "\n" +
      "I also evaluate AI coding-agent output for Codex and Claude Code through G2i and DataAnnotation. It changed how carefully I read other people's code, which is a different skill from writing my own. I like turning a complicated idea into something people can use."
  };

  get bioParagraphs(): string[] {
    return this.info.describe.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  }

  readonly picture = 'images/profile-linkedin.jpg';
}
