import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReviewComponent} from './review/review.component';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'about', redirectTo: '', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactsComponent },
  { path: 'review', component: ReviewComponent },
];
