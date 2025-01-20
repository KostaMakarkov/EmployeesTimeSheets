import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectedReport } from '../../types/reportType';

@Component({
  selector: 'app-clock-in',
  imports: [],
  templateUrl: './clock-in.component.html',
  styleUrl: './clock-in.component.scss',
})
export class ClockInComponent {
  constructor(public dialogRef: MatDialogRef<any>, private dialog: MatDialog) {}
  selectedReport: SelectedReport = { date: '', startTime: '' } as SelectedReport;

  onTimeChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedReport.startTime = inputElement.value;
  }

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedReport.date = inputElement.value;
  }

  saveClockIn() {
    this.dialogRef.close(this.selectedReport);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
