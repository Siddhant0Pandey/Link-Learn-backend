import express from "express";
import { User } from "../models/User.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = await User.create({ name, username, password });

    return res.status(201).json({
      message: "User registered successfully, Please go to Login Page",
      user: newUser,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Both credential are required" });
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(401).json({ message: "Incorrect username" });
    }
    if (existingUser.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful", user: existingUser });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
