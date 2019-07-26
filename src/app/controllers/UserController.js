import User from '../models/User';

class UserController {
  async store(req, res) {
    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const { name, email } = await User.create(req.body);

    return res.status(200).json({ name, email });
  }
}

export default new UserController();
