"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoutes = void 0;
const student_1 = require("../controllers/student");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const userValidator_1 = require("../middlewares/userValidator");
const studentRoutes = (0, express_1.default)();
exports.studentRoutes = studentRoutes;
studentRoutes.post("/signin", student_1.studentLogin);
studentRoutes.get("/task", auth_1.studentAuth, student_1.getAllTasks);
studentRoutes.patch("/update-task", auth_1.studentAuth, userValidator_1.updateTaskValidate, student_1.updateTask);
