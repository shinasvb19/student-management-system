import { NextFunction, Request, Response } from "express";

import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  department: Joi.string(),
});

const adminSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  student_email: Joi.string().email().required(),
  dueDate: Joi.date().required(),
  status: Joi.string().valid("completed", "overdue", "pending").optional(),
});

const updateTaskSchema = Joi.object({
  taskId: Joi.string().required(),
  status: Joi.string().valid("completed").required(),
});

export const validateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = taskSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = adminSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};
export const updateTaskValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateTaskSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};
