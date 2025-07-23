"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateForEmployeeMonth = calculateForEmployeeMonth;
exports.calculateForAllMonth = calculateForAllMonth;
const employee_1 = require("../models/employee");
const attendance_1 = require("../models/attendance");
const salary_1 = require("../models/salary");
const sequelize_1 = require("sequelize");
const tax_1 = require("../utils/tax");
async function calculateForEmployeeMonth(empId, month) {
    const employee = await employee_1.Employee.findByPk(empId);
    if (!employee)
        throw new Error("Employee not found");
    let [year, monthNum] = month.split("-").map(Number);
    const startDate = new Date(year, monthNum - 1, 1); // e.g., 2025-07-01
    const endDate = new Date(year, monthNum, 0);
    const attendance = await attendance_1.Attendance.findAll({
        where: {
            employeeId: empId,
            date: {
                [sequelize_1.Op.between]: [startDate, endDate],
            },
        },
    });
    const grossSalary = employee.basicSalary + employee.allowances + employee.hra;
    const pf = 0.12 * employee.basicSalary;
    const tax = (0, tax_1.calculateTax)(grossSalary);
    const daysInMonth = new Date(year, monthNum, 0).getDate();
    const dailyWage = grossSalary / daysInMonth;
    let fullDays = 0;
    let halfDays = 0;
    attendance.forEach((a) => {
        if (a.hoursWorked >= 8)
            fullDays++;
        else
            halfDays++;
    });
    const totalWorkedSalary = fullDays * dailyWage + halfDays * (dailyWage / 2);
    const netSalary = totalWorkedSalary - pf - tax - employee.deductions;
    const [salary] = await salary_1.Salary.upsert({
        employeeId: empId,
        month,
        grossSalary,
        pf,
        tax,
        netSalary,
    });
    return { salary };
}
async function calculateForAllMonth(month) {
    const employees = await employee_1.Employee.findAll();
    const salaryResults = await Promise.all(employees.map((emp) => calculateForEmployeeMonth(emp.id, month)));
    const totalPayout = salaryResults.reduce((sum, result) => sum + result.salary.netSalary, 0);
    return {
        totalPayout,
        details: salaryResults.map((r) => r.salary),
    };
}
