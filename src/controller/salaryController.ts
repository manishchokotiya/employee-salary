import { Request, Response } from "express";
import { calculateForAllMonth, calculateForEmployeeMonth } from "../services/salaryService"; // adjust path as needed

export const salaryCalculate = async (req: Request, res: Response) => {
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
      ? await calculateForEmployeeMonth(employeeId, month)
      : await calculateForAllMonth(month);
    return res.status(200).json({
      success: true,
      message: "Salary calculated successfully",
      data: result,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

export const getSalary = async (req: Request, res: Response) => {
  try {
    const employeeId = parseInt(req.params.employeeId);
    const month = req.query.month as string;
    const user = (req as any).user;

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

    const { salary } = await calculateForEmployeeMonth(employeeId, month);

    return res.status(200).json({
      success: true,
      message: "Salary fetched successfully",
      data: salary,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};
