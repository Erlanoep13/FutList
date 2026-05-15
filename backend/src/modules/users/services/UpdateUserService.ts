import { AppDataSource } from '../../../config/data-source';
import { User } from '../entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
  id: number;
  email?: string;
  passwordText?: string;
  isActive?: boolean;
}

export class UpdateUserService {
  async execute({ id, email, passwordText, isActive }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Atualiza apenas os campos que foram enviados na requisição
    if (email) user.email = email;
    if (isActive !== undefined) user.isActive = isActive;
    
    if (passwordText) {
      user.passwordHash = await hash(passwordText, 8);
    }

    await userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
    };
  }
}