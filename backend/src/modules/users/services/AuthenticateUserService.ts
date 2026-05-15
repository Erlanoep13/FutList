import { AppDataSource } from '../../../config/data-source';
import { User } from '../../users/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  passwordText: string;
}

export class AuthenticateUserService {
  async execute({ email, passwordText }: IRequest) {
    const userRepository = AppDataSource.getRepository(User);

    // 1. Verifica se o e-mail existe
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('E-mail ou senha incorretos.'); // Mensagem genérica por segurança
    }

    // 2. Verifica se o usuário está ativo
    if (!user.isActive) {
      throw new Error('Usuário inativo. Procure o administrador.');
    }

    // 3. Compara a senha digitada com o Hash do banco de dados
    const passwordMatch = await compare(passwordText, user.passwordHash);
    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // 4. Gera o Token JWT (O 'crachá' de acesso)
    const token = sign(
      { email: user.email },
      process.env.JWT_SECRET || 'super_secret_futlist_key', // A senha secreta que configuramos no Docker
      {
        subject: String(user.id), // O JWT exige que o ID seja convertido para string
        expiresIn: '1d', // O token expira em 1 dia
      }
    );

    // 5. Retorna o usuário (sem a senha) e o Token
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };
  }
}