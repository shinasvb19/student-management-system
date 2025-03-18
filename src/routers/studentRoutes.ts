import { getAllTasks, studentLogin, updateTask } from "../controllers/student";

import Router from "express";
import { studentAuth } from "../middlewares/auth";
import { updateTaskValidate } from "../middlewares/userValidator";

const studentRoutes = Router();
studentRoutes.post("/signin", studentLogin);
studentRoutes.get("/task", studentAuth, getAllTasks);
studentRoutes.patch(
  "/update-task",
  studentAuth,
  updateTaskValidate,
  updateTask
);
export { studentRoutes };
