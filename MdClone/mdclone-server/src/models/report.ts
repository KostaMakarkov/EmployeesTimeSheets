import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IReport extends Document {
  date: string;
  startTime: string;
  endTime?: string;
  reporterId: Schema.Types.ObjectId;
  firstName?: string;
  lastName?: string;
  managerId?: Schema.Types.ObjectId;
  closed: boolean;
  status?: string;
}

export interface ReportStatus {
  status: string;
  employeeId: string;
  date: string;
}

const reportsSchema: Schema<IReport> = new Schema({
  date: { type: String, required: true },
  startTime: { type: String, default: "" },
  endTime: { type: String, default: "" },
  reporterId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  managerId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  status: { type: String, default: "new" },
  closed: { type: Boolean, default: false },
});

const Report = mongoose.model<IReport>("Report", reportsSchema);

export default Report;
