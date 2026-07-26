import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Racha } from '../modules/racha/entities/Racha'; 
import { RachaNome } from '../modules/racha/entities/RachaNome';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  
  // Usa a URL do Supabase que configuramos no Render. 
  // Se não achar (quando rodar no seu PC local), usa os dados de fallback.
  url: process.env.DATABASE_URL || 'postgresql://admin:adminpassword@localhost:5432/futlist_db',
  
  // REGRA: Conexões em produção (Supabase) precisam de SSL. Localmente não.
  ssl: process.env.DATABASE_URL && process.env.DATABASE_URL.includes('supabase') ? { rejectUnauthorized: false } : false,
  
  // IMPORTANTE: Trocado para true para que o TypeORM construa as tabelas no Supabase agora
  synchronize: true, 
  
  logging: false,
  entities: [Racha, RachaNome], 
  migrations: [],
  subscribers: [],
});