import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Event from '../models/Event';

class MeetupController {
  async index(req, res) {
    const { date, page = 1 } = req.query;

    const events = await Event.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
      limit: 1,
      offset: (page - 1) * 1,
    });

    return res.json(events);
  }
}

export default new MeetupController();
