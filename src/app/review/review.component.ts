import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ThankYouDialogComponent } from './thank-you-dialog.component';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class ReviewComponent {
  reviewForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      comment: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.dialog.open(ThankYouDialogComponent).afterClosed().subscribe(() => {
        this.reviewForm.reset();
      });
    }
  }
}
