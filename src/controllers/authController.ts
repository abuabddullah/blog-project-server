import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { config } from "../config/config";
import { ApiError } from "../utils/ApiError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already registered");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
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
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    if (user.isBlocked) {
      throw new ApiError(403, "User is blocked");
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      statusCode: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
