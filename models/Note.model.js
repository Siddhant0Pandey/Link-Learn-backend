import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      enum: ["Personal", "Study", "Work"],
      default: "Personal",
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
