import { Router } from 'express';
import { rachaRoutes } from '../modules/racha/racha.routes';

const routes = Router();

// ROTA DE PING (Mantém o Render acordado)
routes.get('/ping', (req, res) => {
  return res.json({ status: 'ok', message: 'Servidor FutList operando!' });
});

// Suas rotas principais
routes.use('/racha', rachaRoutes);

export { routes };