import Event from "../models/Event";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("attendees");
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Faild to fetch events" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Event creation failed" });
  }
};
