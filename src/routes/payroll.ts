import { Router } from "express";
import { authenticate } from "../middleware";
import { authorize } from "../middleware/role";
import { distributePayroll, payrollHistory } from "../controller/payrollController";

const router= Router()
router.post('/distribute',authenticate,authorize('HR','ADMIN'),distributePayroll);
router.get('/history',authenticate,authorize('HR','ADMIN'),payrollHistory)


export default router;