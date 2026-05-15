import { Router } from 'express';
import { RachaController } from './RachaController';

const rachaRoutes = Router();
const rachaController = new RachaController();

rachaRoutes.post('/', rachaController.create);
rachaRoutes.get('/:id', rachaController.show); 

export { rachaRoutes };