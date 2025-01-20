import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { Employee } from '../models/employeeModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpService: HttpService) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.httpService.get<Employee[]>('/employees').pipe(
      catchError((error) => {
        console.error('Error fetching employee data:', error);
        return throwError(() => new Error('Error fetching employee data'));
      })
    );
  }
  getEmployeeById(id: string): Observable<Employee> {
    return this.httpService.get<Employee>(`/employees/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching employee data:', error);
        return throwError(() => new Error('Error fetching employee data'));
      })
    );
  }
}
