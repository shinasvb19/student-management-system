import "dotenv/config";

import express, { Express, Request, Response } from "express";

import { adminRoutes } from "./src/routers/adminRoutes";
import connectDB from "./src/config/mongoConfig";
import morgan from "morgan";
import { studentRoutes } from "./src/routers/studentRoutes";

const port = 3000;
connectDB();
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
