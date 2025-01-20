import { Schema } from "mongoose";
import { ReportErrorsEnum } from "../enum/reportErrors.enum";
import { IEmployee } from "../models/employee";
import Report, { IReport, ReportStatus } from "../models/report";
import { ReportRepo } from "../repositories/reportRepo";
import { ValidationError } from "../utils/customError";
import { EmployeeService } from "./employeeService";
import { ObjectId } from "mongodb";

export class ReportService {
  private reportRepo = new ReportRepo();
  private employeeService = new EmployeeService();

  async addReport(newReport: IReport) {
    try {
      const reporterId: ObjectId = new ObjectId(
        newReport.reporterId.toString()
      );
      const employee = await this.employeeService.getEmployeeById(reporterId);
      if (!employee)
        throw new ValidationError(ReportErrorsEnum.InvalidParameters);

      const existingReport = await this.reportRepo.getReportByReporterAndDate(
        reporterId,
        newReport.date
      );
      if (existingReport) {
        existingReport.startTime =
          newReport.startTime || existingReport.startTime;
        existingReport.endTime = newReport.endTime || existingReport.endTime;
        return await this.reportRepo.addNewReport(existingReport);
      } else {
        newReport.firstName = employee.firstName;
        newReport.lastName = employee.lastName;
        newReport.managerId = employee.manager?._id as Schema.Types.ObjectId;
        return await this.reportRepo.addNewReport(newReport);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getReportsByManager(managerId: string) {
    try {
      return await this.reportRepo.getReportsByManager(managerId);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateReportStatus(reportStatus: ReportStatus) {
    try {
      const existingReport = await this.reportRepo.getReportByReporterAndDate(
        new ObjectId(reportStatus.employeeId),
        reportStatus.date
      );
      if (!existingReport)
        throw new ValidationError(ReportErrorsEnum.InvalidParameters);

      existingReport.status = reportStatus.status;
      existingReport.closed = true;

      return await this.reportRepo.updateReportStatus(existingReport);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
