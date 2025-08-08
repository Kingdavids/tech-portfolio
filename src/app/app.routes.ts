import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReviewComponent} from './review/review.component';

export const routes: Routes = [
  { path: '', component: AboutComponent, data: {animation: 'AboutPage'} },
  { path: 'about', redirectTo: '', pathMatch: 'full', data: {animation: 'AboutPage'} },
  { path: 'projects', component: ProjectsComponent, data: {animation: 'ProjectsPage'} },
  { path: 'contact', component: ContactsComponent, data: {animation: 'ContactPage'} },
  { path: 'review', component: ReviewComponent, data: {animation: 'ReviewPage'}},
];
