import express from 'express';
import cors from 'cors';
import { usersRoutes } from './modules/users/users.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { rachaRoutes } from './modules/racha/racha.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);
app.use('/racha', rachaRoutes);

export { app };