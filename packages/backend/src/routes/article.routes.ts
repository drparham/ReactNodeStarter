import { Router } from 'express';
import { createArticle, getArticle, updateArticle, deleteArticle, getArticles } from '../controllers/article.controller';
import { validate } from '../middleware/validate';
import { createArticleSchema, updateArticleSchema } from '../schemas/article.schema';

const router = Router();

router.get('/', getArticles);
router.post('/', validate(createArticleSchema), createArticle);
router.get('/:slug', getArticle);
router.put('/:id', validate(updateArticleSchema), updateArticle);
router.delete('/:id', deleteArticle);

export default router; 