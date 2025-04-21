import { DataSource } from 'typeorm';
import { Article } from '../entities/Article';
import { Tag } from '../entities/Tag';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'blog_db',
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  entities: [Article, Tag],
  migrations: [],
  subscribers: [],
}); 