import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/User';
import { Racha } from '../modules/racha/entities/Racha'; 
import { RachaNome } from '../modules/racha/entities/RachaNome';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASS || 'adminpassword',
  database: process.env.DB_NAME || 'futlist_db',
  synchronize: false, // Use true apenas em dev. Em prod, use migrations.
  logging: false,
  entities: [User, Racha, RachaNome], 
  migrations: [],
  subscribers: [],
});