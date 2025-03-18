import {
  adminSignin,
  assignTask,
  createStudent,
  getAllUsers,
} from "../controllers/admin";
import {
  validateAdmin,
  validateTask,
  validateUser,
} from "../middlewares/userValidator";

import Router from "express";
import { adminAuth } from "../middlewares/auth";

const adminRoutes = Router();
adminRoutes.post("/signin", validateAdmin, adminSignin);
adminRoutes.post("/create-student", adminAuth, validateUser, createStudent);
adminRoutes.get("/students", adminAuth, getAllUsers);
adminRoutes.post("/assign-task", validateTask, adminAuth, assignTask);
export { adminRoutes };
