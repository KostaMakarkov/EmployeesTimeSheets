import { ReportErrorsEnum } from "../enum/reportErrors.enum";
import Report, { IReport } from "../models/report";
import { DbError } from "../utils/customError";
import { ObjectId } from "mongodb";

export class ReportRepo {
  async addNewReport(report: IReport) {
    try {
      return await Report.findOneAndUpdate(
        {
          date: report.date,
          reporterId: report.reporterId,
        },
        {
          $set: {
            startTime: report.startTime || "",
            endTime: report.endTime || "",
            firstName: report.firstName,
            lastName: report.lastName,
            closed: report.closed || false,
            managerId: report.managerId,
          },
        },
        {
          new: true,
          upsert: true,
        }
      ).exec();
    } catch (error) {
      console.error(error);
      throw new DbError(ReportErrorsEnum.CreateError);
    }
  }

  async getReportByReporterAndDate(reporterId: ObjectId, date: string) {
    try {
      return await Report.findOne({ reporterId, date }).exec();
    } catch (error) {
      console.error(error);
      throw new DbError(ReportErrorsEnum.CreateError);
    }
  }
  async getReportsByManager(managerId: string) {
    try {
      return await Report.find({ managerId: managerId, closed: false }).exec();
    } catch (error) {
      console.error(error);
      throw new DbError(ReportErrorsEnum.CreateError);
    }
  }

  async updateReportStatus(report: IReport) {
    try {
      return await Report.findByIdAndUpdate(report._id, report);
    } catch (error) {}
  }
}
