import express from "express";
import { login, register } from "../controllers/authController";
import validateRequest from "../middleware/validateRequest";
import { AuthValidation } from "../zodValidators/auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registrationValidationSchema),
  register
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  login
);

export default router;
