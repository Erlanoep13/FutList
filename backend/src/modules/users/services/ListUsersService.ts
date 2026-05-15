import { AppDataSource } from '../../../config/data-source';
import { User } from '../entities/User';

export class ListUsersService {
  async execute() {
    const userRepository = AppDataSource.getRepository(User);

    // O select garante que a senha nunca seja enviada na resposta da API
    const users = await userRepository.find({
      select: ['id', 'email', 'isActive', 'createdAt', 'updatedAt'],
    });

    return users;
  }
}