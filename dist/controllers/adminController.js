"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUser = void 0;
const User_1 = require("../models/User");
const ApiError_1 = require("../utils/ApiError");
const blockUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User_1.User.findById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(404, "User not found");
        }
        if (user.role === "admin") {
            throw new ApiError_1.ApiError(403, "Cannot block admin users");
        }
        user.isBlocked = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: "User blocked successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.blockUser = blockUser;
