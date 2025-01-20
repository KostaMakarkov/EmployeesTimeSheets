import { Router } from "express";
import { EmployeesRoutes } from "./routes/employeesRoute";
import { ReportRoutes } from "./routes/reportsRoute";

const router = Router();

router.use("/api/employees", EmployeesRoutes);
router.use("/api/reports", ReportRoutes);

export default router;
