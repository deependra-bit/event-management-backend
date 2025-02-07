import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Event = mongoose.model("Event", eventSchema);
export default Event;
