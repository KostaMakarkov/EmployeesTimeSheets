import mongoose, { Schema, Document } from "mongoose";

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  role: string;
  manager: IEmployee;
  phone: number;
  permission: string;
}

const employeeSchema: Schema<IEmployee> = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  permission: { type: String, required: true },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  phone: { type: Number, required: true, unique: true },
});

const Employee = mongoose.model<IEmployee>("Employee", employeeSchema);

export default Employee;
