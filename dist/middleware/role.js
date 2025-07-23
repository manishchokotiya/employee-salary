"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
function authorize(...roles) {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!roles.includes(userRole))
            return res.status(403).json("Forbidden");
        next();
    };
}
