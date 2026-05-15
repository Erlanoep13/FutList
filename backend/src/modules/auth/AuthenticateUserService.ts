import { AppDataSource } from '../../config/data-source';
import { User } from '../users/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IRequest {
  email: string;
  passwordText: string;
}

export class AuthenticateUserService {
  async execute({ email, passwordText }: IRequest) {
    // 1. Vai buscar o repositório através do AppDataSource (é aqui que o erro acontecia)
    const userRepository = AppDataSource.getRepository(User);

    // 2. Verifica se o e-mail existe na base de dados
    const user = await userRepository.findOneBy({ email });
    if (!user) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // 3. Verifica se o utilizador está ativo
    if (!user.isActive) {
      throw new Error('Utilizador inativo. Procure o administrador.');
    }

    // 4. Compara a senha digitada com a senha encriptada (Hash)
    const passwordMatch = await compare(passwordText, user.passwordHash);
    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos.');
    }

    // 5. Gera o Token JWT (O 'crachá' de acesso)
    const token = sign(
      { email: user.email },
      process.env.JWT_SECRET || 'super_secret_futlist_key',
      {
        subject: String(user.id),
        expiresIn: '1d',
      }
    );

    // 6. Retorna o utilizador e o Token
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };
  }
}