import { Router } from 'express';
import { UserController } from './UserController';

const usersRoutes = Router();
const userController = new UserController();

usersRoutes.post('/', userController.create);
usersRoutes.get('/', userController.index);
usersRoutes.put('/:id', userController.update);
usersRoutes.delete('/:id', userController.delete);

export { usersRoutes };