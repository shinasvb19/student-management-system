import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

export const adminAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;

    if (req.user.role !== "admin") {
      res.status(403).json({ message: "Forbidden: Admins only." });
      return;
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
    return;
  }
};

export const studentAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded;

    if (req.user.role !== "student") {
      res.status(403).json({ message: "Forbidden: Students only route." });
      return;
    }
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
    return;
  }
};
