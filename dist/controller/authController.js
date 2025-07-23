"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.logout = logout;
const employee_1 = require("../models/employee");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await employee_1.Employee.findOne({ where: { email } });
        if (!user || !user.password || !bcryptjs_1.default.compareSync(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                data: null,
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            data: null,
        });
    }
}
async function logout(req, res, next) {
    res.clearCookie("token");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}
