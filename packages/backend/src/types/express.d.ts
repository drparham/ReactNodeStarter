import { Request, Response, NextFunction } from 'express';
import { User } from './index';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      auth?: {
        email: string;
        name?: string;
      };
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    auth?: {
      email: string;
      name?: string;
    };
  }
}

export type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void; 