import { ObjectId } from "mongodb";
import { EmployeeErrorsEnum } from "../enum/employeeErrors.enum";
import { IEmployee } from "../models/employee";
import { EmployeeRepo } from "../repositories/employeeRepo";
import { DuplicateError, ValidationError } from "../utils/customError";

export class EmployeeService {
  private employeeRepo = new EmployeeRepo();

  async addNewEmployee(newEmployee: IEmployee) {
    try {
      await this.checkExisting(newEmployee);
      return await this.employeeRepo.addNewEmployee(newEmployee);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkExisting(employee: IEmployee) {
    try {
      if (!employee.phone) {
        throw new ValidationError(EmployeeErrorsEnum.InvalidParameters);
      }
      const employeeData = await this.employeeRepo.findByPhone(employee.phone);
      if (employeeData) {
        throw new DuplicateError(EmployeeErrorsEnum.Duplicate);
      }
      return;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEmployeeById(employeeId: ObjectId) {
    try {
      return this.employeeRepo.findById(employeeId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
