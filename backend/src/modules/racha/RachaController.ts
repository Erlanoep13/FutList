import { Request, Response } from 'express';
import { CriarSorteioService } from './CriarSorteioService';
import { ShowRachaService } from './ShowRachaService';

export class RachaController {
  async create(req: Request, res: Response) {
    const { cabecalho, quantidade_por_time, nomes } = req.body;

    try {
      const criarSorteioService = new CriarSorteioService();
      
      const resultado = await criarSorteioService.execute({
        cabecalho,
        quantidade_por_time,
        nomes
      });

      return res.status(201).json(resultado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response) {
    const id = parseInt(req.params.id as string, 10);

    try {
      const showRachaService = new ShowRachaService();
      const racha = await showRachaService.execute(id);

      return res.json(racha);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
