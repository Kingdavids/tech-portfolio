import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material-ui.module';
import { Contact} from '../interfaces/portfolio-revised';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, MaterialModule,],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts: Contact[] = [
    { social: 'Instagram', url: 'https://www.instagram.com/lords_nta10ment/', icon: 'instagram'},
    { social: 'LinkedIn', url: 'https://www.linkedin.com/in/olumuyiwa-ogunniyi-09149890/', icon: 'linkedin' },
    { social: 'YouTube', url: 'https://www.youtube.com/@lordsnta10ment61', icon: 'youtube' },
    { social: 'Github', url: 'https://github.com/Kingdavids', icon: 'github' }
  ];
}
