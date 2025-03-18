"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentAuth = exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminAuth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Access denied. No token provided." });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (req.user.role !== "admin") {
            res.status(403).json({ message: "Forbidden: Admins only." });
            return;
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Invalid token." });
        return;
    }
};
exports.adminAuth = adminAuth;
const studentAuth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Access denied. No token provided." });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (req.user.role !== "student") {
            res.status(403).json({ message: "Forbidden: Students only route." });
            return;
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: "Invalid token." });
        return;
    }
};
exports.studentAuth = studentAuth;
