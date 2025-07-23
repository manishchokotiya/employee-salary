"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../middleware");
const attendanceController_1 = require("../controller/attendanceController");
const router = (0, express_1.Router)();
router.post('/mark', middleware_1.authenticate, attendanceController_1.markAttendance);
exports.default = router;
