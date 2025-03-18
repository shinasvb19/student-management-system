"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskValidate = exports.validateAdmin = exports.validateUser = exports.validateTask = void 0;
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    department: joi_1.default.string(),
});
const adminSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
});
const taskSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    student_email: joi_1.default.string().email().required(),
    dueDate: joi_1.default.date().required(),
    status: joi_1.default.string().valid("completed", "overdue", "pending").optional(),
});
const updateTaskSchema = joi_1.default.object({
    taskId: joi_1.default.string().required(),
    status: joi_1.default.string().valid("completed").required(),
});
const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateTask = validateTask;
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateUser = validateUser;
const validateAdmin = (req, res, next) => {
    const { error } = adminSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.validateAdmin = validateAdmin;
const updateTaskValidate = (req, res, next) => {
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
};
exports.updateTaskValidate = updateTaskValidate;
