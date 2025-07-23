"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalary = exports.salaryCalculate = void 0;
const salaryService_1 = require("../services/salaryService"); // adjust path as needed
const salaryCalculate = async (req, res) => {
    try {
        const { month, employeeId } = req.body;
        if (!month) {
            return res.status(400).json({
                success: false,
                message: "Month is required",
                data: null,
            });
        }
        const result = employeeId
            ? await (0, salaryService_1.calculateForEmployeeMonth)(employeeId, month)
            : await (0, salaryService_1.calculateForAllMonth)(month);
        return res.status(200).json({
            success: true,
            message: "Salary calculated successfully",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
            data: null,
        });
    }
};
exports.salaryCalculate = salaryCalculate;
const getSalary = async (req, res) => {
    try {
        const employeeId = parseInt(req.params.employeeId);
        const month = req.query.month;
        const user = req.user;
        if (!month) {
            return res.status(400).json({
                success: false,
                message: "Month is required",
                data: null,
            });
        }
        if (user.role !== 'HR' && user.id !== employeeId) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Access denied",
                data: null,
            });
        }
        const { salary } = await (0, salaryService_1.calculateForEmployeeMonth)(employeeId, month);
        return res.status(200).json({
            success: true,
            message: "Salary fetched successfully",
            data: salary,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
            data: null,
        });
    }
};
exports.getSalary = getSalary;
