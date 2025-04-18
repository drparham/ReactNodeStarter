import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { prisma } from '../index';
import { User } from '../types';

// Extend Express Request type to include user and auth
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

// Auth0 middleware
export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

// User middleware to attach user to request
export const attachUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.auth) {
      return next();
    }

    const user = await prisma.user.upsert({
      where: { email: req.auth.email },
      update: {},
      create: {
        email: req.auth.email,
        name: req.auth.name,
      },
    });

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Admin middleware
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}; 