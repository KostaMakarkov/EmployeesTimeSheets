import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeePageComponent } from './employee-page.component';

const routes: Routes = [
  { path: 'employee', component: EmployeePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // You can use `forRoot` in AppModule or `forChild` in feature modules
  exports: [RouterModule],
})
export class EmployeePageRoutingModule {}
