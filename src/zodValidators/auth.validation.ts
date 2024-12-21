import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Identifier is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const registrationValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Identifier is required." }),
    email: z.string({ required_error: "Identifier is required." }),
    password: z.string({ required_error: "Password is required" }),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registrationValidationSchema,
};
