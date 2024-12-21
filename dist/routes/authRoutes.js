"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
const auth_validation_1 = require("../zodValidators/auth.validation");
const router = express_1.default.Router();
router.post("/register", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.registrationValidationSchema), authController_1.register);
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), authController_1.login);
exports.default = router;
