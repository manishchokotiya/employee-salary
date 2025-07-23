import { Request, Response } from "express";
import { Employee } from "../models/employee";
import bcrypt from "bcryptjs"

export async function createEmployee(req:Request,res:Response) {
    try {
        const {name,email,password,role,basicSalary,allowances,hra,deductions}=req.body
        const passHash= bcrypt.hashSync(password,10)
        const emp= await Employee.create({name,email,password:passHash,role,basicSalary,allowances,hra,deductions}
        )
        return res.status(200).json({success:true,message:"employee add successfully",data:emp})

    } catch (error:any) {
        return res.status(500).json({success:false,message:error.message,data:null})
    }
}
export async function getEmployee(req:Request,res:Response) {
    try {
        const id=+req.params.id
        const user= (req as any).user
        if(user.role!=='HR' && user.id !==id)
            return res.status(403).json({success:false,message:"Forbidden",data:null})
        const emp= await Employee.findByPk(id)
        return res.status(200).json({success:true,message:"getEmployee details successfully",data:emp})
    } catch (error :any) {
        return res.status(500).json({success:false,message:error.message,data:null})
    }
}