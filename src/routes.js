import { Router } from 'express';

// controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

// / middlewares
import authMiddleware from './app/middlewares/auth';

const router = new Router();

router.post('/users', UserController.store);
router.post('/session', SessionController.store);

router.use(authMiddleware);

router.put('/users', UserController.update);

export default router;
