import { Model,DataTypes } from "sequelize";
import { sequelize } from "../config/db";
export class Salary extends Model{
    id!:number;employeeId!:number;month!:string;grossSalary!:number;netSalary!:number;tax!:number;pf!:number
}
Salary.init({
    employeeId:DataTypes.INTEGER,
    month:DataTypes.STRING,
    grossSalary:DataTypes.FLOAT,
    netSalary:DataTypes.FLOAT,
    tax:DataTypes.FLOAT,
    pf:DataTypes.FLOAT
},{sequelize,modelName:"salary"})