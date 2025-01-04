import express from "express";
import { EducationalLink } from "../models/activities/EducationalLink.model.js";
import { jwtAuthMiddleware } from "../middleware/jwt.js";
import { EduShortcut } from "../models/activities/EduShortcutLink.model.js";
import { EntShortcut } from "../models/activities/EntShortcutLink.model.js";
import { EntertianmentLink } from "../models/activities/EntertainmentLink.model.js";

const router = express.Router();

// educational activity router

router.get("/eduactivity", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const edulinks = await EducationalLink.find({ user: userId });

    const eduShortcuts = await EduShortcut.find({ user: userId });

    if (
      (!edulinks || edulinks.length === 0) &&
      (!eduShortcuts || eduShortcuts.length === 0)
    ) {
      return res.status(404).json({ message: "No links found for the user" });
    }

    res.status(200).json({
      eduLink: edulinks || [],
      eduShortcutLink: eduShortcuts || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch the links" });
  }
});

router.post("/eduactivity", jwtAuthMiddleware, async (req, res) => {
  try {
    const { title, url } = req.body;
    const userId = req.user.id;

    if (!title || !url) {
      return res.status(400).json({ message: "Title and URL are required" });
    }

    const newEduLink = await EducationalLink.create({
      title,
      url,
      user: userId,
    });
    const newEduShortcutLink = await EduShortcut.create({
      title,
      url,
      user: userId,
    });
    res
      .status(201)
      .json({ eduLink: newEduLink, eduShortcutLink: newEduShortcutLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add the link" });
  }
});

router.delete("/eduactivity/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const edulinks = await EducationalLink.findOneAndDelete({
      _id: id,
      user: userId,
    });
    const eduShortcutlinks = await EduShortcut.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!edulinks || !eduShortcutlinks) {
      return res.status(404).json({ message: "Links not found" });
    }
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to delete the task." });
  }
});
// entertianment avitivity router

router.get("/entactivity", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User ID from JWT:", userId);
    const entlinks = await EntertianmentLink.find({ user: userId });
    const entShortcuts = await EntShortcut.find({ user: userId });
    if (
      (!entlinks || entlinks.length === 0) &&
      (!entShortcuts || entShortcuts.length === 0)
    ) {
      return res.status(404).json({ message: "No links found for the user" });
    }
    res.status(200).json({ entLink: entlinks, entShortcutLink: entShortcuts });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to fetch the entertainment links" });
  }
});

router.post("/entactivity", jwtAuthMiddleware, async (req, res) => {
  try {
    const { title, url } = req.body;
    const userId = req.user.id;

    if (!title || !url) {
      return res.status(400).json({ message: "Title and URL are required" });
    }

    const newEntLink = await EntertianmentLink.create({
      title,
      url,
      user: userId,
    });
    const newEntShortcutLink = await EntShortcut.create({
      title,
      url,
      user: userId,
    });
    res
      .status(201)
      .json({ entLink: newEntLink, entShortcutLink: newEntShortcutLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add the link" });
  }
});

router.delete("/entactivity/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const entlinks = await EntertianmentLink.findOneAndDelete({
      _id: id,
      user: userId,
    });
    const entShortcutlinks = await EntShortcut.findOneAndDelete({
      _id: id,
      user: userId,
    });
    if (!entlinks || !entShortcutlinks) {
      return res.status(404).json({ message: "Links not found" });
    }
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to delete the task." });
  }
});

export default router;
