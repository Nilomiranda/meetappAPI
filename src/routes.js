import { Router } from 'express';

// controllers
import UserController from './app/controllers/UserController';

// / middlewares

const router = new Router();

router.post('/users', UserController.store);

export default router;
