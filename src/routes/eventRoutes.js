import express from "express";
import { createEvent, getEvents } from "../controllers/eventController";

const router = express.Router();
router.get("/", getEvents);
router.get("/", createEvent);

export default router;
