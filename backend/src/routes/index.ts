import { Router } from 'express';
// Suas outras importações de rotas aqui, ex:
// import { rachaRoutes } from '../modules/racha/routes/racha.routes';

const routes = Router();

// ROTA DE PING (Mantém o Render acordado)
routes.get('/ping', (req, res) => {
  return res.json({ status: 'ok', message: 'Servidor FutList operando!' });
});

// Suas outras rotas aqui, ex:
// routes.use('/racha', rachaRoutes);

export { routes };