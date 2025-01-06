import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/user.routes.js";
import taskRoute from "./routes/task.routes.js";
import educationalRoute from "./routes/links.routes.js";

const PORT = process.env.PORT || 3000;
const uri = process.env.DATABASE_URL;

const app = express();
app.use(cors());
app.use(express.json());

//routes

app.use("/", userRoute);
app.use("/", taskRoute);
app.use("/", educationalRoute);

// mongoose connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Successfully connected to the port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });
