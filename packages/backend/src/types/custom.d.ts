import { Request, Response, NextFunction } from 'express';
import { User } from './index';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    auth?: {
      email: string;
      name?: string;
    };
  }
}

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>; 