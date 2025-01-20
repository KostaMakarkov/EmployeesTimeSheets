import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { catchError, Observable, throwError } from 'rxjs';
import { NewReport, Report, ReportStatus } from '../types/reportType';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private httpService: HttpService) {}

  addNewReport(newReport: NewReport): Observable<NewReport> {
    return this.httpService
      .post<NewReport>('/reports/newReport', newReport)
      .pipe(
        catchError((error) => {
          console.error('Error fetching employee data:', error);
          return throwError(() => new Error('Error fetching employee data'));
        })
      );
  }
  getManagerReports(managerId: string): Observable<Report[]> {
    return this.httpService
      .get<Report[]>(`/reports/getReports/${managerId}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching reports:', error);
          return throwError(() => new Error('Error fetching reports data'));
        })
      );
  }
  updateReportStatus(report: ReportStatus): Observable<ReportStatus> {
    return this.httpService
      .post<ReportStatus>(`/reports/reportStatus`, report)
      .pipe(
        catchError((error) => {
          console.error('Error updating report:', error);
          return throwError(() => new Error('Error updating report data'));
        })
      );
  }
}
