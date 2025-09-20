import express from "express";

import { createTaskController, getTask, getTaskById, updateTask, deleteTask } from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/tasks", createTaskController);
router.get("/tasks", getTask);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);


export default router;