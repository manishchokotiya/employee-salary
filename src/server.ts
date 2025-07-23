import  express from "express";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth';
import empRoutes from './routes/employee';
import attRoutes from './routes/attendance';
import salRoutes from './routes/salary';
import payRoutes from './routes/payroll';
import dotenv from 'dotenv'
import { sequelize } from "./config/db";
import './models/attendance';
import './models/employee';
import './models/salary';



dotenv.config()
export const app=express()
app.use(express.json())
app.use(cookieParser())
app.use("/auth",authRoutes);
app.use('/employee',empRoutes);
app.use('/attendance',attRoutes);
app.use('/salary',salRoutes);
app.use('/payroll',payRoutes);




(async()=>{
    try {
      await sequelize.authenticate();
      await sequelize.sync({alter:true});
      console.log("Db connected")
      app.listen(3000,()=>{
        console.log("server running on 3000")
      })
    } catch (error) {
     
    }
 })()

 app.use((_,res)=>res.status(404).send("Not Found "))