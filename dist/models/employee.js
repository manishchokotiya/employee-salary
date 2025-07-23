"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Employee extends sequelize_1.Model {
}
exports.Employee = Employee;
Employee.init({
    name: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    role: sequelize_1.DataTypes.ENUM('EMPLOYEE', 'HR', 'ADMIN'),
    basicSalary: sequelize_1.DataTypes.FLOAT,
    allowances: sequelize_1.DataTypes.FLOAT,
    hra: sequelize_1.DataTypes.FLOAT,
    deductions: sequelize_1.DataTypes.FLOAT
}, { sequelize: db_1.sequelize, modelName: 'employee' });
