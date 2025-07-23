"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = createEmployee;
exports.getEmployee = getEmployee;
const employee_1 = require("../models/employee");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function createEmployee(req, res) {
    try {
        const { name, email, password, role, basicSalary, allowances, hra, deductions } = req.body;
        const passHash = bcryptjs_1.default.hashSync(password, 10);
        const emp = await employee_1.Employee.create({ name, email, password: passHash, role, basicSalary, allowances, hra, deductions });
        return res.status(200).json({ success: true, message: "employee add successfully", data: emp });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: null });
    }
}
async function getEmployee(req, res) {
    try {
        const id = +req.params.id;
        const user = req.user;
        if (user.role !== 'HR' && user.id !== id)
            return res.status(403).json({ success: false, message: "Forbidden", data: null });
        const emp = await employee_1.Employee.findByPk(id);
        return res.status(200).json({ success: true, message: "getEmployee details successfully", data: emp });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: null });
    }
}
