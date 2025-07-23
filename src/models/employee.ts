import { Model,DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export class Employee extends Model{
    id!:number;name!:string;email!:string;password!:string;role!:'Employee'|"HR"|"ADMIN";basicSalary!:number;allowances!:number;
    hra!:number;deductions!:number;

}
Employee.init({
    name:DataTypes.STRING,
    email:DataTypes.STRING,
    password:DataTypes.STRING,
    role:DataTypes.ENUM('EMPLOYEE','HR','ADMIN'),
    basicSalary:DataTypes.FLOAT,
    allowances:DataTypes.FLOAT,
    hra:DataTypes.FLOAT,
    deductions:DataTypes.FLOAT

},{sequelize,modelName:'employee'})