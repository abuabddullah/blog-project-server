"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    NODE_ENV: process.env.NODE_ENV || "development",
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/blog-app",
    jwtSecret: process.env.JWT_SECRET || "your-secret-key",
    jwtExpiresIn: "1d",
    adminEmail: process.env.ADMIN_EMAIL || "admin@example.com",
    adminPassword: process.env.ADMIN_PASSWORD || "admin123",
};
