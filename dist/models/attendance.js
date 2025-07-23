"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attendance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Attendance extends sequelize_1.Model {
}
exports.Attendance = Attendance;
Attendance.init({
    employeeId: sequelize_1.DataTypes.INTEGER,
    date: sequelize_1.DataTypes.DATEONLY,
    hoursWorked: sequelize_1.DataTypes.FLOAT
}, { sequelize: db_1.sequelize, modelName: "attendance" });
