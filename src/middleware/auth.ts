import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";

export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Authentication required");
    }

    const decoded = jwt.verify(token, config.jwtSecret) as any;
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    if (user.isBlocked) {
      throw new ApiError(403, "User is blocked");
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, "Authentication failed"));
  }
};

export const adminAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("adminAuth");
  try {
    await auth(req, res, () => {});

    if (req.user.role !== "admin") {
      throw new ApiError(403, "Admin access required");
    }

    next();
  } catch (error) {
    next(error);
  }
};
