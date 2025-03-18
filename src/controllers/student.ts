import { Request, Response } from "express";

import Task from "../schemas/taskSchema";
import User from "../schemas/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const studentLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const student = await User.findOne({ email, role: "student" });
    if (!student) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: student._id, role: student.role, email: student.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: student._id,
        name: student.userName,
        email: student.email,
        role: student.role,
      },
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllTasks = async (req: Request | any, res: Response) => {
  try {
    const user = req.user.id;
    console.log(user);
    const tasks = await Task.find({ assignedTo: user });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req: Request | any, res: Response) => {
  try {
    const { taskId, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { studentLogin, getAllTasks, updateTask };
