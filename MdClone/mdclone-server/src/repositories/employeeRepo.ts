import { ObjectId } from "mongodb";
import { EmployeeErrorsEnum } from "../enum/employeeErrors.enum";
import Employee, { IEmployee } from "../models/employee";
import { DbError } from "../utils/customError";

export class EmployeeRepo {
  async addNewEmployee(employee: IEmployee) {
    try {
      return await Employee.create(employee);
    } catch (error) {
      console.error(error);
      throw new DbError(EmployeeErrorsEnum.CreateError);
    }
  }

  async findByPhone(employeePhone: number) {
    try {
      return await Employee.findOne({ phone: employeePhone });
    } catch (error) {
      console.error(error);
      throw new DbError(EmployeeErrorsEnum.DbError);
    }
  }

  async findById(employeeId: ObjectId) {
    try {
      return await Employee.findOne({ _id: employeeId }).populate(
        "manager",
        "firstName lastName"
      );
    } catch (error) {
      console.error(error);
      throw new DbError(EmployeeErrorsEnum.DbError);
    }
  }
}
