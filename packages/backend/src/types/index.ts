import { Request } from 'express';

export type User = {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  createdAt: Date;
  updatedAt: Date;
};

declare module 'express' {
  interface Request {
    user?: User;
  }
} 