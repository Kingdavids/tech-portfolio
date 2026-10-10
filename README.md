# tech.muyiwadavids.com

The source for my software engineering portfolio, live at https://tech.muyiwadavids.com. It is an Angular 19 single page site with a hero, About, Experience, Work and Contact section. The Work section holds 20+ projects, each with an optional case study written in the STAR format (situation, task, action, result).

## Stack

- Angular 19 with standalone components, built by the Angular application builder
- Angular Material for the case study dialog, plus hand-written SCSS and CSS for everything else
- Server-side rendering and prerendering for the page shell
- EmailJS for the contact form
- AWS Amplify for hosting

## How the project data works

Project and case study data does not live in the build. The Work section fetches two JSON files from a GitHub Gist when the page loads in the browser, so I can edit a project and see it live without a rebuild or deploy. Each service falls back to a copy bundled in `public/data/` if the Gist is unreachable.

- `src/app/services/project.service.ts` loads `portfolio.json`
- `src/app/services/spring-boot-project.service.ts` loads `spring-boot-projects.json`
- `public/data/` holds the fallback copies. They are not synced automatically, so after editing one I copy it to the Gist with `gh gist edit <id> --filename <name> <file>`.

The Gist's raw URL is cached for about five minutes, so edits take a few minutes to appear.

A project looks like this:

```json
{
  "title": "Project name",
  "description": "Card summary",
  "category": "Full-Stack",
  "year": "2026",
  "link": "https://live-site.example",
  "githubUrl": "https://github.com/user/repo",
  "tools": ["Next.js", "PostgreSQL"],
  "highlights": ["Short chip"],
  "screenshotUrl": "images/screenshot.jpg",
  "priority": 1,
  "featured": true,
  "star": { "situation": "", "task": "", "action": "", "result": "" }
}
```

`featured` projects appear under the default Featured filter. `noEmbed` skips the live iframe preview for sites that block framing. `academic` sorts a project after the professional work.

## Decisions worth knowing about

### Prerendering and live data

Angular prerenders at build time, and any HTTP call made during that render is frozen into the static HTML. The first version of the Gist loading did exactly that, so edits to the Gist never reached the live site. The Work component now skips its fetch on the server, so the prerendered page contains the hero, About and Experience, and the project list loads in the browser.

### Build output name

If prerendering is ever turned off, Angular writes `index.csr.html` instead of `index.html`, and Amplify's rewrite rule expects `index.html`. The `postbuild` script copies the file only when `index.html` is missing, so the build works either way.

### Mobile memory

The Work cards embed live iframes of the real sites on desktop. On phones that crashed the browser after enough scrolling, because the iframe memory was not released reliably. Touch and narrow screens now get static screenshots, and only desktop gets live previews.

### Scroll position on load

Browsers restore scroll position or jump to a URL fragment on reload, and both can reapply late after fonts and images shift the layout. `src/index.html` locks scrolling at the start of every load and releases it once the page has settled at the top.

### Resume link

Amplify's default single page app rewrite rule matches `.pdf` and returns `index.html`. The Resume button therefore points at the PDF served by jsDelivr from this repository. The rule can be fixed in the Amplify Console, after which the local path in `public/resume/` works.

## Running locally

```bash
npm install
npm start
```

The dev server runs at http://localhost:4200. In a dev build the page shell is server-rendered, and running on `localhost` can fall back to client rendering with a warning about allowed hosts. That does not happen on the deployed domain.

## Building

```bash
npm run build
```

Output goes to `dist/portfolio-revised/browser`. `npm run serve:ssr:portfolioRevised` starts the Express server in `src/server.ts` against that build. Amplify serves the static output and does not run that server.

## Deployment

Pushes to `main` deploy through AWS Amplify Hosting, which serves the static files from `dist/portfolio-revised/browser` behind CloudFront. The build settings and the rewrite and redirect rules live in the Amplify Console, so this repository has no `amplify.yml`.

Two Amplify behaviors shaped the code. Its single page app rewrite rule returns `index.html` for any extension it does not list, which is why the resume is served from jsDelivr and the sitemap is a `.txt` file. And the CDN caches the page and assets, so a new deploy can take a few minutes to show up everywhere.

## Testing

```bash
npm run test:ci
```

This runs the Jasmine and Karma suite once in headless Chrome. Set `CHROME_BIN` if Chrome is not on the default path. There are 18 tests:

- The two data services return the live Gist data and fall back to the bundled JSON when the Gist request fails.
- The Work section opens on the Featured filter, falls back to All when nothing is featured, sorts class projects last, filters by category and search text, and shows the empty state only after the data has loaded.
- The Experience, About and Contact components render their data, and the contact form validates its fields.
- The app renders all five page sections.

There are no end-to-end tests and no continuous integration workflow yet, so the suite runs locally.

## Layout

- `src/app/hero`, `about`, `experience`, `work`, `contacts` hold one component per section
- `src/app/work/work-detail-dialog.component.*` is the case study dialog
- `src/app/shared` holds the nav, footer, tech marquee and small directives (tilt, magnetic hover, scroll reveal)
- `src/app/interfaces` holds the data types
- `public/data` holds the fallback project data
- `public/images` holds screenshots and the social preview card

## Contact form

The form sends through EmailJS. The service, template and public key constants at the top of `src/app/contacts/contacts.component.ts` are placeholders until real values are set. With placeholders, the form opens the visitor's mail app with the message filled in.
