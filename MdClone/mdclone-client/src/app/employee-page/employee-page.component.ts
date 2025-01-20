import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employeeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  imports: [EmployeeDetailsComponent],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
})
export class EmployeePageComponent implements OnInit {
  constructor(
    private employeesService: EmployeeService,
    private router: Router
  ) {}
  employees: Employee[] = [];
  errorMessage: string = '';
  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        if (data.length > 0) {
          this.setEmployee(data[0]);
        }
      },
      error: (error) => {
        this.errorMessage = 'Error fetching employee data';
      },
    });
  }

  setEmployee(employee: Employee) {
    this.router.navigate(['/employees'], { queryParams: { id: employee._id } });
  }
}
