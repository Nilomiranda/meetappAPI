import { isBefore } from 'date-fns';
import Event from '../models/Event';

class EventController {
  async store(req, res) {
    const {
      title, description, location, date,
    } = req.body;

    if (isBefore(date, new Date())) {
      return res.status(400).json({ error: "You can't schedule an event to a past date" });
    }

    const event = await Event.create({
      title,
      description,
      location,
      date,
      user_id: req.userId,
    });

    return res.json(event);
  }
}

export default new EventController();
