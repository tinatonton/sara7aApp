import joi from "joi";
import { generalFields } from "../../Middleware/validation.middleware.js";
import Joi from "joi";

export const signupSchema = {
  body: joi.object({
    firstName: generalFields.firstName.required(),
    lastName: generalFields.lastName.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmPassword: generalFields.confirmPassword,
    age: generalFields.age,
    phone: generalFields.phone,
  }),
};

export const loginSchema = {
  body: joi
    .object({
      email: generalFields.email.required(),
      password: generalFields.password.required(),
    })
    .required(),
};
export const confirmEmailSchema = {
  body: joi
    .object({
      email: generalFields.email.required(),
      otp: generalFields.otp.required(),
    })
    .required(),
};

export const forgetPasswordSchema = {
  body: joi
    .object({
      email: generalFields.email.required(),
    })
    .required(),
};

export const resetPasswordSchema = {
  body: joi
    .object({
      email: generalFields.email.required(),
      otp: generalFields.otp.required(),
      newPassword: generalFields.password.required(),
      confirmNewPassword: joi.ref("newPassword"),
    })

};
