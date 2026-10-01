import http from 'k6/http';
import { sleep, check } from 'k6';

// Configuração de Carga (escalonável para estresse: 10, 50, 100, 1000 VUs...)
export const options = {
    vus: 100,          // 10 Usuários Virtuais simultâneos
    duration: '60s',  // Duração total do teste
};

export default function () {
    // IMPORTANTE: Apontem para a rota real da aplicação
    // O FutList roda na porta 3333 e vamos testar a nova rota /ping
    const res = http.post('http://localhost:3333/racha');

    // Validações automatizadas (Checks)
    check(res, {
        'status é 200': (r) => r.status === 200,
        'tempo de resposta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}