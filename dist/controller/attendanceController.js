"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAttendance = markAttendance;
const attendance_1 = require("../models/attendance");
async function markAttendance(req, res) {
    try {
        const employeeId = req.user.id;
        const { date, hoursWorked } = req.body;
        const rec = await attendance_1.Attendance.create({ employeeId, date, hoursWorked });
        return res.status(200).json({ success: true, message: "attendance marked successfully", data: rec });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message, data: null });
    }
}
