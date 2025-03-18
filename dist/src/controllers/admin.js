"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTask = exports.getAllUsers = exports.adminSignin = exports.createStudent = void 0;
const taskSchema_1 = __importDefault(require("../schemas/taskSchema"));
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield userSchema_1.default.findOne({ email, role: "admin" });
        if (!admin) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const isMatch = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: admin._id, role: admin.role, email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({
            message: "Login successful",
            token,
            admin: {
                id: admin._id,
                name: admin.userName,
                email: admin.email,
                role: admin.role,
            },
        });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.adminSignin = adminSignin;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, department } = req.body;
        const student = new userSchema_1.default({
            userName: name,
            email: email,
            password: password,
            department: department,
            role: "student",
        });
        yield student.save();
        console.log("Student created:", student);
        res.status(200).json({ message: "student created" });
        return;
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "email already exists" });
            return;
        }
        res.status(400).json({ message: "error occurred" });
        return;
    }
});
exports.createStudent = createStudent;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userSchema_1.default.find({ role: { $ne: "admin" } }).select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getAllUsers = getAllUsers;
const assignTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, student_email, dueDate, status } = req.body;
        if (!title || !description || !student_email || !dueDate) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }
        const parsedDueDate = new Date(dueDate);
        if (isNaN(parsedDueDate.getTime())) {
            res
                .status(400)
                .json({ message: "Invalid dueDate format. Use YYYY-MM-DD." });
            return;
        }
        const student = yield userSchema_1.default.findOne({
            email: student_email,
            role: "student",
        });
        if (!student) {
            res.status(404).json({ message: "Student not found." });
            return;
        }
        const assignedTo = student._id;
        const newTask = new taskSchema_1.default({
            title,
            description,
            assignedTo,
            dueDate,
            status: status || "pending",
        });
        yield newTask.save();
        res.status(201).json({
            message: "Task assigned successfully",
            task: newTask,
        });
        return;
    }
    catch (error) {
        console.error("Error assigning task:", error);
        res.status(500).json({ message: "Server error" });
        return;
    }
});
exports.assignTask = assignTask;
