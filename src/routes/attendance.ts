import { Router } from "express";
import { authenticate } from "../middleware";
import { markAttendance } from "../controller/attendanceController";

const router=Router()
router.post('/mark',authenticate,markAttendance);
 

export default router;