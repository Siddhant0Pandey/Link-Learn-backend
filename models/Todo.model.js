import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
