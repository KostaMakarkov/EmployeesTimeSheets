import { Request, Response, Router } from "express";
import Employee from "../models/employee";
import { EmployeeService } from "../services/employeeService";
import { ValidationError } from "../utils/customError";
import { EmployeeErrorsEnum } from "../enum/employeeErrors.enum";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../validations/employeeValidation";

export const EmployeesRoutes = Router();
const employeeService = new EmployeeService();

EmployeesRoutes.get("/", async (req: Request, res: any) => {
  try {
    const employees = await Employee.find().populate(
      "manager",
      "firstName lastName"
    ); // Populate the manager field with firstName and lastName
    res.status(200).json(employees);
  } catch (error: any) {
    console.error("error", error);
    return res.status(error.status).json(error.message);
  }
});

EmployeesRoutes.post(
  "/newEmployee",
  validateRequest(employeeSchema),
  async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, role, manager, phone, permission } = req.body;
      const newEmployee = new Employee({
        firstName,
        lastName,
        role,
        manager,
        phone,
        permission
      });

      await employeeService.addNewEmployee(newEmployee);
      res.status(201).json(newEmployee);
    } catch (error: any) {
      console.error("Error creating employee:", error);
      res.status(error.status).json(error.message);
    }
  }
);

EmployeesRoutes.get("/:id", async (req: Request, res: any) => {
  try {
    const employeeId = req.params.id;
    if (!isValidObjectId(employeeId)) {
      throw new ValidationError(EmployeeErrorsEnum.InvalidParameters);
    }
    const objectId: ObjectId = new ObjectId(employeeId);
    const employee = await employeeService.getEmployeeById(objectId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error: any) {
    console.error("Error fetching employee:", error);
    res.status(error.status).json(error.message);
  }
});
