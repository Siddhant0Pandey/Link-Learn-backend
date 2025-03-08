import express from "express";
import crypto from "crypto";
import { User } from "../models/User.model.js";
import { generateToken } from "../middleware/jwt.js";

const router = express.Router();

function hashPassword(password, salt) {
  if (!salt) {
    throw new Error("Salt is required for hashing");
  }
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
}

function generateSalt() {
  return crypto.randomBytes(16).toString("hex");
}

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

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      salt,
    });

    return res.status(201).json({
      message: "User registered successfully, Please go to Login Page",
      user: { name: newUser.name, username: newUser.username },
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
      return res.status(400).json({ message: "Both credentials are required" });
    }

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(401).json({ message: "Incorrect username" });
    }
    console.log("Existing User:", existingUser);

    if (!existingUser.salt) {
      throw new Error("Salt is missing for this user");
    }

    const hashedPassword = hashPassword(password, existingUser.salt);

    if (hashedPassword !== existingUser.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const payload = {
      username: existingUser.username,
      id: existingUser._id,
    };

    const token = generateToken(payload);
    console.log(token);

    return res.status(200).json({
      message: "Login successful",
      user: { name: existingUser.name, username: existingUser.username },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
