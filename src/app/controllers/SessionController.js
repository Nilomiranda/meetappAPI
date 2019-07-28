import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!(await user.checkPassword(req.body.password, user.password_hash))) {
      return res.status(400).json({ error: 'Incorrect credentials' });
    }

    const { name, email, id } = user;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiration,
    });

    return res.status(200).json({
      id,
      name,
      email,
      token,
    });
  }
}

export default new SessionController();
