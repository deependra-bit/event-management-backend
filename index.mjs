import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

io.on("connection", (socket) => {
  console.log(" A user connected:", socket.id);

  socket.on("joinEvent", (eventId) => {
    socket.join(eventId);
    console.log(`User joined event: ${eventId}`);
  });

  socket.on("leaveEvent", (eventId) => {
    socket.leave(eventId);
    console.log(`User left event: ${eventId}`);
  });

  socket.on("disconnect", () => {
    console.log(" A user disconnected");
  });
});
app.get("/", (req, res) => {
  res.send(" Event Management Backend is Running!");
});

server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
