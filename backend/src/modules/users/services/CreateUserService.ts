import { AppDataSource } from '../../../config/data-source';
import { User } from '../entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
  email: string;
  passwordText: string;
}

export class CreateUserService {
  async execute({ email, passwordText }: IRequest) {
    // Pega a conexão com a tabela de usuários
    const userRepository = AppDataSource.getRepository(User);

    // 1. Verifica se o e-mail já existe no banco
    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      throw new Error('Já existe um usuário cadastrado com este e-mail.');
    }

    // 2. CRIPTOGRAFIA DA SENHA (O número 8 é o 'salt', o nível de embaralhamento)
    const hashedPassword = await hash(passwordText, 8);

    // 3. Cria o objeto do usuário preparado para salvar
    const user = userRepository.create({
      email,
      passwordHash: hashedPassword, // Salvamos o hash, nunca a senha pura!
    });

    // 4. Salva no banco de dados
    await userRepository.save(user);

    // 5. Retorna os dados para o front-end (removendo a senha do retorno por segurança)
    return {
      id: user.id,
      email: user.email,
      isActive: user.isActive,
    };
  }
}