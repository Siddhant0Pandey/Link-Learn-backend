import express from "express";
import { EducationalLink } from "../models/EducationalLink.model";
import { jwtAuthMiddleware } from "../middleware/jwt";

const router = express.Router();

router.get("/eduactivity", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const edulinks = await EducationalLink.find({ user: userId });
    res.status(200).json({ edulinks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch the links" });
  }
});
