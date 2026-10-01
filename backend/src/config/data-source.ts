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
  
  // Mude para false em produção para evitar locks e problemas de performance no Supabase
  synchronize: process.env.NODE_ENV !== 'production', 
  
  logging: false,
  entities: [Racha, RachaNome], 
  migrations: [],
  subscribers: [],
  
  // IMPORTANTE: Configurações do pool de conexão para evitar que o Supabase pare de funcionar
  extra: {
    max: 10, // Limite de conexões do pool
    idleTimeoutMillis: 30000, // Fecha conexões inativas após 30 segundos
    connectionTimeoutMillis: 10000, // Timeout para tentar conectar
    keepAlive: true, // Mantém a conexão TCP viva
  }
});