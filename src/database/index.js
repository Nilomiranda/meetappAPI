/* eslint-disable no-console */
import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';

const models = [User];

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

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
