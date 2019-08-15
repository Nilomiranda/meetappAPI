import { isBefore } from 'date-fns';
import Event from '../models/Event';

class EventController {
  async index(req, res) {
    const events = await Event.findAll({
      where: {
        user_id: req.userId,
      },
    });

    return res.json(events);
  }

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

  async update(req, res) {
    // check if event belongs to logged user
    const event = await Event.findOne({
      where: {
        id: req.params.id,
        user_id: req.userId,
      },
    });

    if (!event) {
      return res.status(401).json({ error: 'You can only edit your own events' });
    }

    // check if event hasn't happened
    if (isBefore(event.date, new Date())) {
      return res
        .status(401)
        .json({ error: "You can't edit an event that has already happened" });
    }

    await event.update(req.body);

    // event.save();

    return res.json(event);
  }

  async delete(req, res) {
    const event = await Event.findOne({
      where: {
        user_id: req.userId,
        id: req.params.id,
      },
    });

    if (!event) {
      return res.status(404).json({
        error: "You are not the organizer of this event, or it doens't exist anymore",
      });
    }

    if (isBefore(event.date, new Date())) {
      return res
        .status(401)
        .json({ error: "You can't cancel an event that has already happened" });
    }

    await event.destroy();

    return res.json({ success: 'Event cancelled successfully' });
  }
}

export default new EventController();
