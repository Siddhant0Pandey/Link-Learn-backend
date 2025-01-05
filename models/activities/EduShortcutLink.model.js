import mongoose from "mongoose";

const educationalshortcutlinkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    timeSpent: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const EduShortcut = mongoose.model(
  "EduShortcut",
  educationalshortcutlinkSchema
);