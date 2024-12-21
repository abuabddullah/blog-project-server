"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const config_1 = require("../config/config");
const ApiError_1 = require("../utils/ApiError");
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            throw new ApiError_1.ApiError(400, "Email already registered");
        }
        const user = await User_1.User.create({
            name,
            email,
            password,
        });
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.config.jwtSecret, {
            expiresIn: config_1.config.jwtExpiresIn,
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            statusCode: 201,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                // token,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_1.User.findOne({ email });
        if (!user) {
            throw new ApiError_1.ApiError(401, "Invalid credentials");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new ApiError_1.ApiError(401, "Invalid credentials");
        }
        if (user.isBlocked) {
            throw new ApiError_1.ApiError(403, "User is blocked");
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.config.jwtSecret, {
            expiresIn: config_1.config.jwtExpiresIn,
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: {
                token,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
