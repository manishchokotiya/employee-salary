import { NextFunction, Request, Response } from "express";
import { Employee } from "../models/employee";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await Employee.findOne({ where: { email } });
    if (!user || !user.password || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only over HTTPS
        sameSite: "strict",
        maxAge: 3600000, // 1 hour
      })
      .json({
        success: true,
        message: "Logged in successfully",
        data: { id: user.id, name: user.name, role: user.role },
      });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged out successfully" });
}
