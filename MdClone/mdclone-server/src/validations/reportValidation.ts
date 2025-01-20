import Joi from "joi";

export const reportStartSchema = Joi.object({
  date: Joi.string().required().messages({
    "string.empty": "date is required",
  }),
  startTime: Joi.string(),
  endTime: Joi.string(),
  status: Joi.string(),
  reporterId: Joi.string().required().messages({
    "string.empty": "reporter id is required",
  }),
});

export const reportStatusSchema = Joi.object({
  status: Joi.string().required().messages({
    "string.empty": "status is required",
  }),
  employeeId: Joi.string().required().messages({
    "string.empty": "employee id is required",
  }),
  date: Joi.string().required().messages({
    "string.empty": "date is required",
  }),
});
