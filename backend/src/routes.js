import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import userController from './app/controllers/userController';
import sessionController from './app/controllers/sessionController';
import fileController from './app/controllers/fileController';
import providerController from './app/controllers/providerController';
import AppointmentController from './app/controllers/appointmentController';
import ScheduleController from './app/controllers/scheduleController';
import NotificationController from './app/controllers/notificationController';

import authMidleware from './app/midlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', userController.store);
routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/sessions', sessionController.store);

routes.use(authMidleware);

routes.put('/users', userController.update);

routes.get('/providers', providerController.index);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), fileController.store);

export default routes;
