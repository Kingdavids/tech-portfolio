import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { WorkCategory, WorkItem } from '../interfaces/work-item';

@Component({
  selector: 'app-work-detail-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './work-detail-dialog.component.html',
  styleUrl: './work-detail-dialog.component.css',
})
export class WorkDetailDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public item: WorkItem) {}

  displayHost(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  }

  categoryClass(category: WorkCategory): string {
    return 'cat-' + category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}
