import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { checkJwt, attachUser, requireAdmin } from '../middleware/auth';

const router = Router();

// Get all tags
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: {
            articles: true
          }
        }
      }
    });
    res.json(tags);
  } catch (error) {
    next(error);
  }
});

// Create tag
router.post('/', checkJwt, attachUser, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const tag = await prisma.tag.create({
      data: {
        name
      }
    });
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
});

// Delete tag
router.delete('/:id', checkJwt, attachUser, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.tag.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router; 