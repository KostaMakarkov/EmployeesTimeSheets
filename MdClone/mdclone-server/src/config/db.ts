import mongoose from "mongoose";
import { configEnv } from "./config";
import Employee from "../models/employee";
import Report from "../models/report";
import { employeesMock } from "../employeesMock";
import { reportsMock } from "../reportsMock";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(configEnv.dbUri);
    console.info("MongoDB connected successfully");

    // insert mock data for assignment
    const employeeCount = (await Employee.countDocuments()) || 0;
    if (employeeCount === 0) {
      await Employee.insertMany(employeesMock);
    }
    const reportsCount = (await Report.countDocuments()) || 0;
    if (reportsCount === 0) {
      await Report.insertMany(reportsMock);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
