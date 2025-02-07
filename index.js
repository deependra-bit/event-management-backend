import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();
import authRoutes from "./src/routes/authRoutes.js";
app.use("/api/auth", authRoutes);
import eventRoutes from "./src/routes/eventRoutes.js";
app.use("/api/events", eventRoutes);

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is runningon port ${PORT}`));
