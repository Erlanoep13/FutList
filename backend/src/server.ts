import 'reflect-metadata';
import { AppDataSource } from './config/data-source';
import { app } from './app';

const PORT = 3333;

AppDataSource.initialize()
  .then(() => {
    console.log("🔥 Banco de dados conectado com sucesso!");
    
    // Só inicia o servidor Express SE o banco conectar!
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar com o banco de dados:", error);
  });