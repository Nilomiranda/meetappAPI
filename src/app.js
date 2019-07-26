import express from 'express';
import router from './routes';

import './database';

class App {
  constructor() {
    this.server = express(); // const server = express()

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(router);
  }
}

export default new App().server;
