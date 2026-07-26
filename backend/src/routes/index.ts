import { Router } from 'express';
import { rachaRoutes } from '../modules/racha/racha.routes';
import { AppDataSource } from '../config/data-source';

const routes = Router();

// ROTA DE PING (Mantém o Render e o Supabase acordados)
routes.get('/ping', async (req, res) => {
  try {
    await AppDataSource.query('SELECT 1');
    return res.status(200).json({ status: 'ok', message: 'Servidor e Banco 100% ativos' });
  } catch (error) {
    console.error('Erro no ping do banco de dados:', error);
    return res.status(500).json({ status: 'error', message: 'Erro ao conectar com o banco' });
  }
});

// Suas rotas principais
routes.use('/racha', rachaRoutes);

export { routes };