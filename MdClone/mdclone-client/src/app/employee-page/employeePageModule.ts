import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeePageComponent } from './employee-page.component';
import { ReportsComponent } from '../reports/reports.component';
import { RouterModule } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeService } from '../services/employee.service';
import { ReportsService } from '../services/reports.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [EmployeePageComponent],
  imports: [
    CommonModule,
    RouterModule,
    EmployeeDetailsComponent,
    ReportsComponent,
  ],
  providers: [
    EmployeeService,
    ReportsService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
  exports: [EmployeePageComponent],
})
export class EmployeePageModule {}
