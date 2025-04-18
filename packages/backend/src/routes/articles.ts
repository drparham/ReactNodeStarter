import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { checkJwt, attachUser, requireAdmin } from '../middleware/auth';

const router = Router();

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Get all articles
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tag } = req.query;
    
    const articles = await prisma.article.findMany({
      where: tag ? {
        tags: {
          some: {
            name: tag as string
          }
        }
      } : undefined,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    });
    res.json(articles);
  } catch (error) {
    next(error);
  }
});

// Get article by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    next(error);
  }
});

// Create article
router.post('/', checkJwt, attachUser, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, tags } = req.body;
    const slug = generateSlug(title);
    const article = await prisma.article.create({
      data: {
        title,
        slug,
        content,
        authorId: (req as any).user.id,
        tags: {
          connect: tags?.map((tag: { id: string }) => ({ id: tag.id })) || [],
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    });
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

// Update article
router.put('/:id', checkJwt, attachUser, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, tags } = req.body;
    const article = await prisma.article.update({
      where: { id: req.params.id },
      data: {
        title,
        content,
        tags: {
          set: tags?.map((tag: { id: string }) => ({ id: tag.id })) || [],
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    });
    res.json(article);
  } catch (error) {
    next(error);
  }
});

// Delete article
router.delete('/:id', checkJwt, attachUser, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.article.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router; 