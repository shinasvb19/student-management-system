"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const admin_1 = require("../controllers/admin");
const userValidator_1 = require("../middlewares/userValidator");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const adminRoutes = (0, express_1.default)();
exports.adminRoutes = adminRoutes;
adminRoutes.post("/signin", userValidator_1.validateAdmin, admin_1.adminSignin);
adminRoutes.post("/create-student", auth_1.adminAuth, userValidator_1.validateUser, admin_1.createStudent);
adminRoutes.get("/students", auth_1.adminAuth, admin_1.getAllUsers);
adminRoutes.post("/assign-task", userValidator_1.validateTask, auth_1.adminAuth, admin_1.assignTask);
