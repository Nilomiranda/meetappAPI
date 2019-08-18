import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Registration from '../models/Registration';
import Event from '../models/Event';
import User from '../models/User';
import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/queue';

class RegistrationsController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);

    const ownEvent = await Event.findOne({
      where: {
        user_id: req.userId,
        id: req.params.id,
      },
    });

    if (ownEvent) {
      return res.status(401).json({ error: "You can't register to your own event" });
    }

    const event = await Event.findByPk(req.params.id, {
      include: [{ model: User, as: 'user', attributes: ['email', 'name'] }],
    });

    console.log(event);

    if (isBefore(event.date, new Date())) {
      return res.status(401).json({ error: 'This event already happened' });
    }

    const registeredEvent = await Registration.findOne({
      where: {
        user_id: req.userId,
        event_id: req.params.id,
      },
      include: [{ model: Event, as: 'event', attributes: ['date'] }],
    });

    // console.log('events here', registeredEvent.event.date);

    if (registeredEvent) {
      return res.status(401).json({ error: "You can't register to the same event twice" });
    }

    const sameDateEvent = await Event.findOne({
      where: {
        date: event.date,
        id: {
          [Op.not]: event.id,
        },
      },
    });

    if (sameDateEvent) {
      return res
        .status(400)
        .json({ error: 'You are already registered at another event at the same time' });
    }

    const { id: registrationId } = await Registration.create({
      user_id: req.userId,
      event_id: req.params.id,
    });

    // I need to send event and user to the job

    Queue.add(RegistrationMail.key, { event, user });

    // await Mail.sendMail({
    //   to: `<${event.user.email}>`,
    //   subject: `${user.name} registered to one of your events`,
    //   template: 'registration',
    //   context: {
    //     user: user.name,
    //     event: event.title,
    //     email: user.email,
    //   },
    // });

    return res.json({ succes: 'Sucessfully registered to event', registrationId });
  }
}

export default new RegistrationsController();
