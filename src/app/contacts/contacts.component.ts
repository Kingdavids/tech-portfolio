import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import emailjs from '@emailjs/browser';
import { Contact } from '../interfaces/portfolio-revised';
import { ThankYouDialogComponent } from './thank-you-dialog.component';
import { ScrollRevealDirective } from '../shared/scroll-reveal.directive';

// From your EmailJS dashboard (emailjs.com -> Email Services / Email Templates / Account -> General).
// The public key is meant to be embedded client-side; EmailJS's abuse protection happens on their end.
const EMAILJS_SERVICE_ID = 'REPLACE_WITH_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'REPLACE_WITH_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'REPLACE_WITH_PUBLIC_KEY';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    ScrollRevealDirective,
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  contacts: Contact[] = [
    { social: 'LinkedIn', handle: 'olumuyiwa-ogunniyi', url: 'https://www.linkedin.com/in/olumuyiwa-ogunniyi-09149890/', icon: 'linkedin' },
    { social: 'GitHub', handle: 'Kingdavids', url: 'https://github.com/Kingdavids', icon: 'github' }
  ];

  reviewForm: FormGroup;
  sending = false;
  sendError = false;

  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.reviewForm.valid || !isPlatformBrowser(this.platformId) || this.sending) return;

    this.sending = true;
    this.sendError = false;

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this.reviewForm.value, { publicKey: EMAILJS_PUBLIC_KEY })
      .then(() => {
        this.sending = false;
        this.dialog.open(ThankYouDialogComponent).afterClosed().subscribe(() => {
          this.reviewForm.reset();
        });
      })
      .catch((err) => {
        console.error('Contact form send failed:', err);
        this.sending = false;
        this.sendError = true;
      });
  }
}
