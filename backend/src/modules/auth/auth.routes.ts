import { Router } from 'express';
import { AuthController } from './AuthController';

const authRoutes = Router();
const authController = new AuthController();

// Rota: POST /auth/login
authRoutes.post('/login', authController.handle);

export { authRoutes };