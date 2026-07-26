import { useState } from 'react';
import { api } from '../services/api';
import { isAxiosError } from 'axios';

interface Time {
  nome: string;
  jogadores: string[];
}

export function Racha() {
  const [rawText, setRawText] = useState('');
  const [extraText, setExtraText] = useState('');
  const [nomes, setNomes] = useState<string[]>([]);
  const [cabecalho, setCabecalho] = useState('Racha de Hoje');
  const [qtdPorTime, setQtdPorTime] = useState(5);
  const [isOrganized, setIsOrganized] = useState(false);
  
  const [timesSorteados, setTimesSorteados] = useState<Time[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const limparLista = () => {
    setRawText('');
    setExtraText('');
    setError('');
  };

  const processarLista = () => {
    setError('');
    
    // 1. Processa a lista principal (WhatsApp)
    const linhasPrincipais = rawText.split('\n');
    const nomesPrincipais = linhasPrincipais
      .map(linha => linha.replace(/^\d+\s*[-.)]\s*/, '').trim())
      .filter(linha => {
        const linhaMinuscula = linha.toLowerCase();
        return (
          linha.length > 0 && 
          !linhaMinuscula.includes('lista fechada') && 
          !linhaMinuscula.includes('vagas reservas') &&
          !linhaMinuscula.includes('racha') &&
          linhaMinuscula !== 'reserva' &&  // NOVO: Ignora a palavra solta "reserva"
          linhaMinuscula !== 'reservas'    // NOVO: Ignora o plural também
        );
      });

    // VALIDAÇÃO: A lista principal é obrigatória
    if (nomesPrincipais.length === 0) {
      setError('A lista do WhatsApp é obrigatória. Por favor, cole os nomes para continuar.');
      return;
    }

    // 2. Processa os nomes extras (Opcional)
    const linhasExtras = extraText.split(/[\n,]+/);
    const nomesExtras = linhasExtras
      .map(linha => linha.trim())
      .filter(linha => linha.length > 0);

    const listaUnificada = [...nomesPrincipais, ...nomesExtras];

    // Remove duplicatas
    const listaSemDuplicatas = listaUnificada.filter((nome, index, self) =>
      index === self.findIndex((t) => t.toLowerCase() === nome.toLowerCase())
    );

    setNomes(listaSemDuplicatas);
    setIsOrganized(true);
  };

  const handleSorteio = async () => {
    setError('');

    if (!cabecalho.trim()) {
      setError('Dê um nome ao racha (ex: Racha de Sexta).');
      return;
    }

    if (nomes.length < qtdPorTime * 2) {
      setError(`Número de jogadores insuficiente para formar dois times de ${qtdPorTime}.`);
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/racha', {
        cabecalho,
        nomes,
        quantidade_por_time: qtdPorTime
      });

      setTimesSorteados(response.data.times);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error || 'Erro ao realizar sorteio.');
      } else {
        setError('Erro ao realizar sorteio.');
      }
    } finally {
      setLoading(false);
    }
  };

  const removerNome = (indexToRemove: number) => {
    setNomes(nomes.filter((_, index) => index !== indexToRemove));
  };

  const voltarParaEdicao = () => {
    setError('');
    setIsOrganized(false);
  };

  if (timesSorteados.length > 0) {
    return (
      <div className="min-h-[100dvh] bg-futlist-dark text-futlist-text flex justify-center p-4 pb-10">
        <div className="w-full max-w-md bg-futlist-card rounded-2xl p-6 shadow-2xl border border-gray-800 flex flex-col min-h-[calc(100dvh-3rem)]">
          <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-futlist-green">{cabecalho}</h1>
            <p className="text-futlist-muted text-sm">Times definidos</p>
          </header>

          <div className="flex flex-col gap-4 flex-1">
            {timesSorteados.map((time, idx) => (
              <div key={idx} className="bg-futlist-dark rounded-2xl p-5 border border-gray-700">
                <h3 className="text-futlist-green font-bold mb-3 border-b border-gray-800 pb-2">
                  {time.nome}
                </h3>
                <ul className="space-y-2">
                  {time.jogadores.map((jogador, jIdx) => (
                    <li key={jIdx} className="text-sm flex items-center gap-2">
                      <span className="text-futlist-muted text-xs">{jIdx + 1}.</span>
                      {jogador}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <button
              onClick={() => setTimesSorteados([])}
              className="w-full bg-futlist-dark border border-gray-700 hover:border-futlist-green transition-colors text-futlist-text font-bold py-4 rounded-xl"
            >
              Refazer Sorteio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-futlist-dark text-futlist-text flex justify-center p-4 pb-10">
      <div className="w-full max-w-md bg-futlist-card rounded-2xl p-6 shadow-2xl border border-gray-800 flex flex-col min-h-[calc(100dvh-3rem)]">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-futlist-green">Configurar Racha</h1>
        </header>

        {!isOrganized ? (
          <div className="flex flex-col gap-4 flex-1">
            
            {error && (
              <div className="bg-futlist-red/10 border border-futlist-red text-futlist-red p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col flex-1">
              <label className="block text-sm font-medium text-futlist-muted mb-1">
                Lista do WhatsApp <span className="text-futlist-red">*</span>
              </label>
              <textarea
                data-cy="lista-principal"
                className="w-full flex-1 min-h-[150px] bg-futlist-dark border border-gray-700 rounded-xl p-3 text-futlist-text focus:outline-none focus:border-futlist-green resize-none"
                placeholder="Cole aqui a lista numerada..."
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-futlist-muted mb-1">Nomes Extras (Opcional)</label>
              <textarea
                data-cy="nomes-extras"
                className="w-full h-24 bg-futlist-dark border border-gray-700 rounded-xl p-3 text-futlist-text focus:outline-none focus:border-futlist-green resize-none"
                placeholder="Nomes extras..."
                value={extraText}
                onChange={(e) => setExtraText(e.target.value)}
              />
            </div>

            <div className="mt-auto pt-2 flex flex-col gap-3">
              <button
                data-cy="btn-organizar"
                onClick={processarLista}
                className="w-full bg-futlist-green hover:bg-emerald-500 text-futlist-dark font-bold py-4 rounded-xl transition-colors"
              >
                Organizar Nomes
              </button>
              <button
                data-cy="btn-limpar"
                onClick={limparLista}
                className="w-full bg-transparent border border-futlist-red/50 text-futlist-red hover:bg-futlist-red hover:text-white font-bold py-3 rounded-xl transition-colors"
              >
                Limpar Lista
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex gap-2">
              
              <div className="flex flex-col w-2/3">
                <label className="text-xs text-futlist-muted mb-1 ml-1 font-medium">
                  Nome do Racha
                </label>
                <input 
                  type="text" 
                  value={cabecalho}
                  onChange={(e) => setCabecalho(e.target.value)}
                  className="w-full bg-futlist-dark border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-futlist-green"
                />
              </div>

              <div className="flex flex-col w-1/3">
                <label className="text-xs text-futlist-muted mb-1 font-medium text-center">
                  Jogadores/time
                </label>
                <input 
                  type="number" 
                  value={qtdPorTime}
                  onChange={(e) => setQtdPorTime(Number(e.target.value))}
                  className="w-full bg-futlist-dark border border-gray-700 rounded-lg p-3 text-sm text-center focus:outline-none focus:border-futlist-green"
                  min="2"
                />
              </div>

            </div>

            <div className="flex flex-col gap-1 w-full mt-2 flex-1">
              <p className="text-xs text-futlist-muted mb-2 px-1 flex justify-between">
                <span>Total de jogadores:</span>
                <span className="font-bold text-futlist-green">{nomes.length}</span>
              </p>

              {nomes.map((nome, index) => (
                <div key={index} className="flex justify-between items-center bg-futlist-dark p-3 mb-1 rounded-lg border border-transparent hover:border-gray-700 transition-colors">
                  <span className="text-sm font-medium">{nome}</span>
                  <button 
                    onClick={() => removerNome(index)}
                    className="text-futlist-red hover:text-red-400 p-1 flex items-center justify-center w-6 h-6 rounded-full hover:bg-futlist-card transition-colors"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-800 bg-futlist-card">
              
              {error && (
                <div className="mb-4 bg-futlist-red/10 border border-futlist-red text-futlist-red p-3 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              <button
                data-cy="btn-sortear"
                onClick={handleSorteio}
                disabled={loading}
                className="w-full bg-futlist-green hover:bg-emerald-500 disabled:opacity-50 text-futlist-dark font-bold py-4 rounded-xl transition-colors"
              >
                {loading ? 'Sorteando...' : 'Realizar Sorteio'}
              </button>
              <button
                onClick={voltarParaEdicao}
                className="w-full bg-transparent text-futlist-muted hover:text-white text-sm py-3 mt-2 transition-colors"
              >
                Voltar para adicionar mais nomes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}