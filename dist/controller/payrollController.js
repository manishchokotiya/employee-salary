"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payrollHistory = exports.distributePayroll = void 0;
const salaryService_1 = require("../services/salaryService");
const distributePayroll = async (req, res) => {
    try {
        const { month } = req.body;
        if (!month)
            return res.status(400).json({ message: "month is required" });
        const { totalPayout, details } = await (0, salaryService_1.calculateForAllMonth)(month);
        res.status(200).json({ success: true, message: "payroll distributed", data: totalPayout, details });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: null });
    }
};
exports.distributePayroll = distributePayroll;
const payrollHistory = async (req, res) => {
    try {
        const month = req.query.month;
        const { totalPayout, details } = await (0, salaryService_1.calculateForAllMonth)(month);
        return res.status(200).json({ success: true, message: "payroll history", data: { month, totalPayout, details } });
    }
    catch (error) {
        return res.status(500).json({
            success: false, message: error.message, data: null
        });
    }
};
exports.payrollHistory = payrollHistory;
