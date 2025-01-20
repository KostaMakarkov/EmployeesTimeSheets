import { Component, OnInit } from '@angular/core';
import { ReportsComponent } from '../../reports/reports.component';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../models/employeeModel';
import { MatDialog } from '@angular/material/dialog';
import { ClockInComponent } from '../clock-in/clock-in.component';
import { ClockOutComponent } from '../clock-out/clock-out.component';
import { NewReport } from '../../types/reportType';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-employee-details',
  imports: [ReportsComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(
    private employeesService: EmployeeService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private reportService: ReportsService
  ) {}

  employee?: Employee;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.getEmployeeDetails(id);
      }
    });
  }

  clockInDialog() {
    const dialogRef = this.dialog.open(ClockInComponent);
    dialogRef.afterClosed().subscribe((date) => {
      const newReport = {
        date: date.date,
        startTime: date.startTime,
        reporterId: this.employee?._id,
      } as NewReport;
      this.reportService.addNewReport(newReport).subscribe((result) => {
        console.log(result);
      });
    });
  }
  clockOutDialog() {
    const dialogRef = this.dialog.open(ClockOutComponent);
    dialogRef.afterClosed().subscribe((date) => {
      const newReport = {
        date: date.date,
        endTime: date.endTime,
        reporterId: this.employee?._id,
      } as NewReport;
      this.reportService.addNewReport(newReport).subscribe((result) => {
        console.log(result);
      });
    });
  }

  getEmployeeDetails(id: string): void {
    this.employeesService.getEmployeeById(id).subscribe({
      next: (data: Employee) => {
        if (data) {
          this.employee = data;
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
