import { Router } from "express";
import { authenticate } from "../middleware";
import { authorize } from "../middleware/role";
import { getSalary, salaryCalculate } from "../controller/salaryController";


const router= Router()
router.post('/calculate',authenticate,authorize('HR','ADMIN'),salaryCalculate);
router.get('/:employeeId',authenticate,getSalary)

export default router