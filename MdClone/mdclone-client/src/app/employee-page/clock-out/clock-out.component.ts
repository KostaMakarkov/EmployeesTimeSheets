import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SelectedReport } from '../../types/reportType';

@Component({
  selector: 'app-clock-out',
  imports: [],
  templateUrl: './clock-out.component.html',
  styleUrl: './clock-out.component.scss',
})
export class ClockOutComponent {
  constructor(public dialogRef: MatDialogRef<any>, private dialog: MatDialog) {}
  selectedReport: SelectedReport = { date: '', endTime: '' } as SelectedReport;

  onTimeChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedReport.endTime = inputElement.value;
  }

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedReport.date = inputElement.value;
  }

  saveClockOut() {
    this.dialogRef.close(this.selectedReport);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
