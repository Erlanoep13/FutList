import { AppDataSource } from '../../config/data-source';
import { Racha } from './entities/Racha';
import { RachaNome } from './entities/RachaNome';

interface IRequest {
  cabecalho: string;
  quantidade_por_time: number;
  nomes: string[]; 
}

export class CriarSorteioService {
  async execute({ cabecalho, quantidade_por_time, nomes }: IRequest) {
    const rachaRepository = AppDataSource.getRepository(Racha);
    const rachaNomeRepository = AppDataSource.getRepository(RachaNome);

    if (!nomes || nomes.length === 0) {
      throw new Error('A lista de nomes não pode estar vazia.');
    }

    if (nomes.length < quantidade_por_time * 2) {
      throw new Error(`É necessário pelo menos ${quantidade_por_time * 2} jogadores para formar dois times.`);
    }

    // 1. Cria e salva o evento principal
    const racha = rachaRepository.create({
      cabecalho,
      quantidade_por_time,
    });
    await rachaRepository.save(racha);

    // 2. Embaralhamento (Fisher-Yates)
    const nomesEmbaralhados = [...nomes];
    for (let i = nomesEmbaralhados.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nomesEmbaralhados[i], nomesEmbaralhados[j]] = [nomesEmbaralhados[j]!, nomesEmbaralhados[i]!];
    }

    // 3. Estrutura os times para o Front-end e prepara as entidades para o banco
    const times: { nome: string; jogadores: string[] }[] = [];
    const nomesParaSalvar: RachaNome[] = [];
    let numeroDoTime = 1;

    for (let i = 0; i < nomesEmbaralhados.length; i += quantidade_por_time) {
      const jogadoresDoTime = nomesEmbaralhados.slice(i, i + quantidade_por_time);
      
      // Monta o array de times que o React espera
      times.push({
        nome: `Time ${numeroDoTime}`,
        jogadores: jogadoresDoTime
      });

      // Prepara as entidades do TypeORM para inserção
      jogadoresDoTime.forEach(nomeJogador => {
        nomesParaSalvar.push(
          rachaNomeRepository.create({
            racha_id: racha.id,
            nome: nomeJogador,
            tipo_entrada: 'sistema',
            time_sorteado: numeroDoTime,
          })
        );
      });

      numeroDoTime++;
    }

    // 4. Salva todos os nomes sorteados de uma vez no banco
    await rachaNomeRepository.save(nomesParaSalvar);

    // 5. Retorna o array "times" que o front-end mapeia na tela de Resultado
    return {
      racha_id: racha.id,
      cabecalho: racha.cabecalho,
      times: times 
    };
  }
}