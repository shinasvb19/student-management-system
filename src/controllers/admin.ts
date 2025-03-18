import { Request, Response } from "express";

import Task from "../schemas/taskSchema";
import User from "../schemas/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminSignin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role, email: admin.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password, department } = req.body;
    const student = new User({
      userName: name,
      email: email,
      password: password,
      department: department,
      role: "student",
    });
    await student.save();
    console.log("Student created:", student);
    res.status(200).json({ message: "student created" });
    return;
  } catch (error) {
    if ((error as any).code === 11000) {
      res.status(400).json({ message: "email already exists" });
      return;
    }
    res.status(400).json({ message: "error occurred" });
    return;
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const assignTask = async (req: Request, res: Response) => {
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
    const student = await User.findOne({
      email: student_email,
      role: "student",
    });
    if (!student) {
      res.status(404).json({ message: "Student not found." });
      return;
    }
    const assignedTo = student._id;
    const newTask = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      status: status || "pending",
    });

    await newTask.save();

    res.status(201).json({
      message: "Task assigned successfully",
      task: newTask,
    });
    return;
  } catch (error) {
    console.error("Error assigning task:", error);
    res.status(500).json({ message: "Server error" });
    return;
  }
};

export { createStudent, adminSignin, getAllUsers, assignTask };
