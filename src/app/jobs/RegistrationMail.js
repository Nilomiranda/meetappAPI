import Mail from '../../lib/mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { event, user } = data;
    await Mail.sendMail({
      to: `<${event.user.email}>`, // event owner email
      subject: `${user.name} registered to one of your events`, // person registering
      template: 'registration',
      context: {
        user: user.name, // person registering
        event: event.title, // event title
        email: user.email, // email from person registering
      },
    });
  }
}

export default new RegistrationMail();
