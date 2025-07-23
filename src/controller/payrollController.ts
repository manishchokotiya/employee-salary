import { Request, Response } from "express";
import { calculateForAllMonth,  } from "../services/salaryService";


export const distributePayroll=async(req:Request,res:Response)=>{
    try {
        const {month}=req.body;
        if(!month)return res.status(400).json({message:"month is required"})
            const {totalPayout,details}=await calculateForAllMonth(month)
        res.status(200).json({success:true,message:"payroll distributed",data:totalPayout,details})

    } catch (error:any) {
        return res.status(500).json({success:false,message:error.message,data:null})
    }
}

export const payrollHistory=async(req:Request,res:Response)=>{
    try {
        const month= req.query.month as string;
        const {totalPayout,details}= await calculateForAllMonth(month)
        return res.status(200).json({success:true,message:"payroll history",data:{month,totalPayout,details}})
    } catch (error:any) {
        return res.status(500).json({
            success:false,message:error.message,data:null
        })
    }
}