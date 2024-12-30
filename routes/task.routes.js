import express from "express";
import { Todo } from "../models/Todo.model.js";
import { jwtAuthMiddleware } from "../middleware/jwt.js";

const router = express.Router();

// Route to fetch tasks for the authenticated user
router.get("/tasks", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user info
    const tasks = await Todo.find({ user: userId }); // Fetch tasks only for the logged-in user
    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks." });
  }
});

// Route to add a new task for the authenticated user
router.post("/tasks", jwtAuthMiddleware, async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated user info

    // Create a new task and associate it with the logged-in user
    const newTask = await Todo.create({ title, isCompleted, user: userId });
    res.status(201).json({ task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add task." });
  }
});

// Route to delete a task for the authenticated user
router.delete("/tasks/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // Get the user ID from the authenticated user info

    // Ensure the task belongs to the logged-in user
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

// Route to update a task for the authenticated user
router.put("/tasks/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body;
    const userId = req.user.id; // Get the user ID from the authenticated user info

    // Ensure the task belongs to the logged-in user
    const updatedTask = await Todo.findOneAndUpdate(
      { _id: id, user: userId }, // Only update the task if it belongs to the logged-in user
      { isCompleted },
      { new: true } // Return the updated task
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
