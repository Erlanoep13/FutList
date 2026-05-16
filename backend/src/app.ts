import express from 'express';
import cors from 'cors';
import { routes } from './routes'; // Importa automaticamente o index.ts da pasta routes

const app = express();

app.use(cors());
app.use(express.json());

// Puxa TODAS as rotas (incluindo o ping) de uma vez só
app.use(routes);

export { app };