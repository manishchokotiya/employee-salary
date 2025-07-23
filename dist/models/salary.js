"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Salary = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Salary extends sequelize_1.Model {
}
exports.Salary = Salary;
Salary.init({
    employeeId: sequelize_1.DataTypes.INTEGER,
    month: sequelize_1.DataTypes.STRING,
    grossSalary: sequelize_1.DataTypes.FLOAT,
    netSalary: sequelize_1.DataTypes.FLOAT,
    tax: sequelize_1.DataTypes.FLOAT,
    pf: sequelize_1.DataTypes.FLOAT
}, { sequelize: db_1.sequelize, modelName: "salary" });
