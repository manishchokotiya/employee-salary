"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const employee_1 = __importDefault(require("./routes/employee"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const salary_1 = __importDefault(require("./routes/salary"));
const payroll_1 = __importDefault(require("./routes/payroll"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
require("./models/attendance");
require("./models/employee");
require("./models/salary");
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use("/auth", auth_1.default);
exports.app.use('/employee', employee_1.default);
exports.app.use('/attendance', attendance_1.default);
exports.app.use('/salary', salary_1.default);
exports.app.use('/payroll', payroll_1.default);
(async () => {
    try {
        await db_1.sequelize.authenticate();
        await db_1.sequelize.sync({ alter: true });
        console.log("Db connected");
        exports.app.listen(3000, () => {
            console.log("server running on 3000");
        });
    }
    catch (error) {
    }
})();
exports.app.use((_, res) => res.status(404).send("Not Found "));
