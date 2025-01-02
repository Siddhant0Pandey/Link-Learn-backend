import express from "express";
import { Todo } from "../models/Todo.model.js";
import { jwtAuthMiddleware } from "../middleware/jwt.js";

const router = express.Router();

router.get("/tasks", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Todo.find({ user: userId });
    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks." });
  }
});

router.post("/tasks", jwtAuthMiddleware, async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const userId = req.user.id;

    const newTask = await Todo.create({ title, isCompleted, user: userId });
    res.status(201).json({ task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add task." });
  }
});

router.delete("/tasks/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const task = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized." });
    }

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task." });
  }
});

router.put("/tasks/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const userId = req.user.id;

    const updatedTask = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { isCompleted },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized." });
    }

    res.status(200).json({ task: updatedTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task." });
  }
});

export default router;
