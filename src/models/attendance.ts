import { Model,DataTypes } from "sequelize";
import { sequelize } from "../config/db";
export class Attendance extends Model{
    id!:number;employeeId!:number;date!:string;hoursWorked!:number;
}
Attendance.init({
    employeeId:DataTypes.INTEGER,
    date:DataTypes.DATEONLY,
    hoursWorked:DataTypes.FLOAT
},{sequelize,modelName:"attendance"})