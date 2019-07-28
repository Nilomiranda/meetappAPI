import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const { name, email } = await User.create(req.body);

    return res.status(200).json({ name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => (oldPassword ? field.required() : field)),
      confirmPassword: Yup.string().when('password', (password, field) => (password ? field.required().oneOf([Yup.ref('password')]) : field)),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    // checking informed password (if is correct)
    if (!(await user.checkPassword(oldPassword, user.password_hash))) {
      return res.status(401).json({ error: 'Wrong password informed' });
    }

    // if password is correct
    const { id, name, email } = await user.update(req.body);

    return res.status(200).json({ id, name, email });
  }
}

export default new UserController();
