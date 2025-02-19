import express from "express";
import { EducationalLink } from "../models/activities/EducationalLink.model.js";
import { jwtAuthMiddleware } from "../middleware/jwt.js";
import { EduShortcut } from "../models/activities/EduShortcutLink.model.js";
import { EntShortcut } from "../models/activities/EntShortcutLink.model.js";
import { EntertianmentLink } from "../models/activities/EntertainmentLink.model.js";

const router = express.Router();

// educational activity router

router.get("/eduactivity/link", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const edulinks = await EducationalLink.find({ user: userId });

    if (!edulinks || edulinks.length === 0) {
      return res.status(404).json({ message: "No links found for the user" });
    }

    res.status(200).json(edulinks); // Now returning the array directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch the links" });
  }
});

// Add a new educational link
router.post("/eduactivity/link", jwtAuthMiddleware, async (req, res) => {
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

    res.status(201).json({ eduLink: newEduLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add the link" });
  }
});

// Update an educational link
router.put("/eduactivity/link/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;
    const userId = req.user.id;

    const updatedEduLink = await EducationalLink.findOneAndUpdate(
      { _id: id, user: userId },
      { title, url },
      { new: true }
    );

    if (!updatedEduLink) {
      return res
        .status(404)
        .json({ message: "Educational link not found or unauthorized." });
    }

    res.status(200).json({ eduLink: updatedEduLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update educational link." });
  }
});
// get a educational shourtcut
router.get("/eduactivity/shortcut", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const edushortcut = await EduShortcut.find({ user: userId });

    if (!edushortcut || edushortcut.length === 0) {
      return res.status(404).json({ message: "No links found for the user" });
    }

    res.status(200).json(edushortcut); // Now returning the array directly
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch the links" });
  }
});

// Add a new educational shortcut
router.post("/eduactivity/shortcut", jwtAuthMiddleware, async (req, res) => {
  try {
    const { title, url } = req.body;
    const userId = req.user.id;

    if (!title || !url) {
      return res.status(400).json({ message: "Title and URL are required" });
    }

    const newEduShortcut = await EduShortcut.create({
      title,
      url,
      user: userId,
    });

    res.status(201).json({ eduShortcutLink: newEduShortcut });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add the shortcut" });
  }
});

// Update an educational shortcut
router.put("/eduactivity/shortcut/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;
    const userId = req.user.id;

    const updatedEduShortcut = await EduShortcut.findOneAndUpdate(
      { _id: id, user: userId },
      { title, url },
      { new: true }
    );

    if (!updatedEduShortcut) {
      return res
        .status(404)
        .json({ message: "Educational shortcut not found or unauthorized." });
    }

    res.status(200).json({ eduShortcutLink: updatedEduShortcut });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update educational shortcut." });
  }
});

// Delete an educational shortcut
router.delete(
  "/eduactivity/shortcut/:id",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const deletedEduShortcut = await EduShortcut.findOneAndDelete({
        _id: id,
        user: userId,
      });

      if (!deletedEduShortcut) {
        return res
          .status(404)
          .json({ message: "Educational shortcut not found" });
      }

      res.status(200).json({ message: "Shortcut deleted successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete the shortcut." });
    }
  }
);

// Delete an educational link
router.delete("/eduactivity/link/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedEduLink = await EducationalLink.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedEduLink) {
      return res.status(404).json({ message: "Educational link not found" });
    }

    res.status(200).json({ message: "Link deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete the link." });
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
