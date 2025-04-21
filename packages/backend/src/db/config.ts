import { DataSource } from 'typeorm';
import { Article } from '../entities/Article';
import { Tag } from '../entities/Tag';
import { CreateTables1700000000000 } from './migrations/1700000000000-CreateTables';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'drparham',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blog_db',
  synchronize: false,
  logging: true,
  entities: [Article, Tag],
  migrations: [CreateTables1700000000000],
  subscribers: [],
}); 