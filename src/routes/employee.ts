import { Router } from "express";
import { authenticate } from "../middleware";
import { authorize } from "../middleware/role";
import { createEmployee,getEmployee } from "../controller/employeeController";
const router= Router()
router.post('/',authenticate,authorize('HR','ADMIN'),createEmployee)
router.get('/:id',authenticate,getEmployee)
export default router