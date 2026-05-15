import { AppDataSource } from '../../config/data-source';
import { Racha } from './entities/Racha';

export class ShowRachaService {
  async execute(id: number) {
    const rachaRepository = AppDataSource.getRepository(Racha);

    // Buscamos o racha e pedimos para o TypeORM trazer a lista de nomes vinculada
    const racha = await rachaRepository.findOne({
      where: { id },
      relations: ['nomes'],
    });

    if (!racha) {
      throw new Error('Racha não encontrado.');
    }

    return racha;
  }
}