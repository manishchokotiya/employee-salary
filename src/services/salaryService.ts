import { Employee } from "../models/employee";
import { Attendance } from "../models/attendance";
import { Salary } from "../models/salary";
import { Op } from "sequelize";
import { calculateTax } from "../utils/tax";

export async function calculateForEmployeeMonth(empId: number, month: string) {
  const employee = await Employee.findByPk(empId);
  if (!employee) throw new Error("Employee not found");

  let [year, monthNum] = month.split("-").map(Number);
const startDate = new Date(year, monthNum - 1, 1); // e.g., 2025-07-01
const endDate = new Date(year, monthNum, 0);



const attendance = await Attendance.findAll({
  where: {
    employeeId: empId,
    date: {
      [Op.between]: [startDate, endDate],
    },
  },
});

  const grossSalary = employee.basicSalary + employee.allowances + employee.hra;
  const pf = 0.12 * employee.basicSalary;
  const tax = calculateTax(grossSalary);

  const daysInMonth = new Date(year, monthNum, 0).getDate();
  const dailyWage = grossSalary / daysInMonth;

  let fullDays = 0;
  let halfDays = 0;

  attendance.forEach((a) => {
    if (a.hoursWorked >= 8) fullDays++;
    else halfDays++;
  });

  const totalWorkedSalary = fullDays * dailyWage + halfDays * (dailyWage / 2);
  const netSalary = totalWorkedSalary - pf - tax - employee.deductions;

  const [salary] = await Salary.upsert({
    employeeId: empId,
    month,
    grossSalary,
    pf,
    tax,
    netSalary,
  });

  return { salary };
}

export async function calculateForAllMonth(month: string) {
  const employees = await Employee.findAll();

  const salaryResults = await Promise.all(
    employees.map((emp) => calculateForEmployeeMonth(emp.id, month))
  );

  const totalPayout = salaryResults.reduce(
    (sum, result) => sum + result.salary.netSalary,
    0
  );

  return {
    totalPayout,
    details: salaryResults.map((r) => r.salary),
  };
}
