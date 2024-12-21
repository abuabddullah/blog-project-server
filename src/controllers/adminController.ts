import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";

export const blockUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.role === "admin") {
      throw new ApiError(403, "Cannot block admin users");
    }

    user.isBlocked = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User blocked successfully",
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
