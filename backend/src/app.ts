import express from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import { routes } from './routes'; // Importa automaticamente o index.ts da pasta routes

const app = express();

app.use(cors());
app.use(express.json());

// Puxa TODAS as rotas (incluindo o ping) de uma vez só
app.use(routes);

// Rota para testar o Sentry (conforme a documentação)
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Como não estamos usando a flag `--import` no terminal (por causa do ts-node-dev), 
// precisamos adicionar o handler manualmente para o Sentry capturar o erro:
Sentry.setupExpressErrorHandler(app);

// Handler de erro final para mostrar algo no navegador e não travar a página
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ error: "Erro capturado pelo Sentry!", sentryId: (res as any).sentry });
});

export { app };