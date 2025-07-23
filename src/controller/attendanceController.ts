import { Request, Response } from "express";
import { Attendance } from "../models/attendance";

export async function markAttendance(req:Request,res:Response) {
    try {
        const employeeId=(req as any).user.id

        const {date,hoursWorked}=req.body
        const rec=await Attendance.create({employeeId,date,hoursWorked})
        return res.status(200).json({success:true,message:"attendance marked successfully",data:rec})
    } catch (error :any) {
        return res.status(500).json({success:false,message:error.message,data:null})
    }
    
}