/* eslint-disable no-console */
import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Event from '../app/models/Event';
import Registration from '../app/models/Registration';

const models = [User, File, Event, Registration];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    this.connection
      .authenticate()
      .then(() => {
        console.log('Connection with database established successfully');
      })
      .catch((err) => {
        console.log('Unable to connect to database', { err });
      });

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
