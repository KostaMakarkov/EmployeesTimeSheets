export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  manager: Employee;
  permission: string;
}
