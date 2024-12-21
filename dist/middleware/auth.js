"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const User_1 = require("../models/User");
const ApiError_1 = require("../utils/ApiError");
const auth = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            throw new ApiError_1.ApiError(401, "Authentication required");
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        const user = await User_1.User.findById(decoded._id);
        if (!user) {
            throw new ApiError_1.ApiError(401, "User not found");
        }
        if (user.isBlocked) {
            throw new ApiError_1.ApiError(403, "User is blocked");
        }
        req.user = user;
        next();
    }
    catch (error) {
        next(new ApiError_1.ApiError(401, "Authentication failed"));
    }
};
exports.auth = auth;
const adminAuth = async (req, res, next) => {
    console.log("adminAuth");
    try {
        await (0, exports.auth)(req, res, () => { });
        if (req.user.role !== "admin") {
            throw new ApiError_1.ApiError(403, "Admin access required");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.adminAuth = adminAuth;
