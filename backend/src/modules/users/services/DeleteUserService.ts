import { AppDataSource } from '../../../config/data-source';
import { User } from '../entities/User';

export class DeleteUserService {
  async execute(id: number) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    await userRepository.remove(user);
  }
}