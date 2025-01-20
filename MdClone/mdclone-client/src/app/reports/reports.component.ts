import {
  Component,
  effect,
  Input,
  OnDestroy,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { Employee } from '../models/employeeModel';
import { ReportsService } from '../services/reports.service';
import { Report, ReportStatus } from '../types/reportType';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports',
  imports: [],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnDestroy {
  protected employeeSignal = signal<Employee | undefined>(undefined);
  protected reportsSignal = signal<any[]>([]);
  private subscription?: Subscription;
  @Input()
  set employee(value: Employee | undefined) {
    this.employeeSignal.set(value);
  }
  constructor(private reportsService: ReportsService) {
    effect(() => {
      this.getManagerReports();
    });
  }
  reports: Report[] = [];

  getManagerReports() {
    const employee = this.employeeSignal();
    if (employee && employee.permission === 'Manager') {
      this.subscription = this.reportsService
        .getManagerReports(employee._id)
        .subscribe({
          next: (data: Report[]) => {
            if (data) {
              this.reportsSignal.set(data);
              this.reports = this.reportsSignal();
            }
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
    } else {
      this.resetReports();
    }
  }

  resetReports() {
    this.employeeSignal.set(undefined);
    this.reportsSignal.set([]);
  }

  updateReportStatus(report: Report, status: string) {
    const reportStatus: ReportStatus = {
      date: report.date,
      employeeId: report.reporterId,
      status: status,
    };
    this.reportsService.updateReportStatus(reportStatus).subscribe({
      next: () => {
        this.getManagerReports();
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
