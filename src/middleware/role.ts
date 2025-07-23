import { NextFunction, Request, Response } from "express";

export function authorize(...roles:string[]){
    return(req:Request,res:Response,next:NextFunction)=>{
        const userRole= (req as any).user.role
        if(!roles.includes(userRole))
            return res.status(403).json("Forbidden")
        next()
    }
}