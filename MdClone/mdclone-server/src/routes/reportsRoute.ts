import { Request, Response, Router } from "express";
import { validateRequest } from "../middleware/validate";
import {
  reportStartSchema,
  reportStatusSchema,
} from "../validations/reportValidation";
import Report, { ReportStatus } from "../models/report";
import { ReportService } from "../services/reportService";

export const ReportRoutes = Router();
const reportsService = new ReportService();

ReportRoutes.post(
  "/newReport",
  validateRequest(reportStartSchema),
  async (req: Request, res: Response) => {
    try {
      const { date, startTime, reporterId, endTime } = req.body;
      const newReport = new Report({
        date,
        startTime,
        reporterId,
        endTime,
      });

      await reportsService.addReport(newReport);
      res.status(201).json(newReport);
    } catch (error: any) {
      console.error("Error creating employee:", error);
      res.status(error.status).json(error.message);
    }
  }
);
ReportRoutes.post(
  "/reportStatus",
  validateRequest(reportStatusSchema),
  async (req: Request, res: Response) => {
    try {
      const { status, employeeId, date } = req.body;
      const reportStatus: ReportStatus = {
        status: status,
        employeeId: employeeId,
        date: date,
      };

      const result = await reportsService.updateReportStatus(reportStatus);
      res.status(201).json(result);
    } catch (error: any) {
      console.error("Error creating employee:", error);
      res.status(error.status).json(error.message);
    }
  }
);
ReportRoutes.get("/getReports/:id", async (req: Request, res: Response) => {
  try {
    const managerId = req.params.id;

    const result = await reportsService.getReportsByManager(managerId);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Error creating employee:", error);
    res.status(error.status).json(error.message);
  }
});
