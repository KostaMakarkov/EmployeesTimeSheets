import Joi from "joi";

export const employeeSchema = Joi.object({
  firstName: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "string.empty": "Last name is required",
  }),
  role: Joi.string().required().messages({
    "string.empty": "Role is required",
  }),
  permission: Joi.string().required().messages({
    "string.empty": "Role is required",
  }),
  manager: Joi.string().optional().allow(null),
  phone: Joi.number().required().messages({
    "string.empty": "Phone is required",
  }),
});
