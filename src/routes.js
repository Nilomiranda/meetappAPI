import { Router } from 'express';
import multer from 'multer';

// configuration
import multerConfig from './config/multer';

// controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import EventController from './app/controllers/EventController';
import RegistrationsController from './app/controllers/RegistrationsController';

// / middlewares
import authMiddleware from './app/middlewares/auth';

const upload = multer(multerConfig);

const router = new Router();

router.post('/users', UserController.store);
router.post('/session', SessionController.store);

router.use(authMiddleware);

router.put('/users', UserController.update);

router.post('/files', upload.single('file'), FileController.store);

router.get('/event', EventController.index);
router.post('/event', EventController.store);
router.put('/event/:id', EventController.update);
router.delete('/event/:id', EventController.delete);

router.post('/event/:id/register', RegistrationsController.store);

export default router;
