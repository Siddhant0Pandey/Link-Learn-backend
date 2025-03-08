import express from "express";
import { Note } from "../models/Note.model.js";

const router = express.Router();

// Create a new note
router.post("/notes/add", async (req, res) => {
  try {
    const { title, tag, content } = req.body;
    const newNote = new Note({ title, tag, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

// Get all notes
router.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Delete a note
router.delete("/note/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;
