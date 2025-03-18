"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const adminRoutes_1 = require("./src/routers/adminRoutes");
const mongoConfig_1 = __importDefault(require("./src/config/mongoConfig"));
const morgan_1 = __importDefault(require("morgan"));
const studentRoutes_1 = require("./src/routers/studentRoutes");
const port = 3000;
(0, mongoConfig_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("tiny"));
app.use("/admin", adminRoutes_1.adminRoutes);
app.use("/student", studentRoutes_1.studentRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
