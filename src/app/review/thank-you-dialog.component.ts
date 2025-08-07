import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-thank-you-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>🎉 Thank you for your comment!</h2>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close color="primary">Close</button>
    </div>
  `,
  imports: [MatDialogModule, MatButtonModule]
})
export class ThankYouDialogComponent {}
