import { Router } from 'express';
import { createArticle, getArticle, updateArticle, deleteArticle, getPublishedArticles, getAdminArticles } from '../controllers/article.controller';
import { validate } from '../middleware/validate';
import { createArticleSchema, updateArticleSchema } from '../schemas/article.schema';

const router = Router();

router.get('/', getPublishedArticles);
router.get('/admin', getAdminArticles);
router.get('/:slug', getArticle);
router.post('/', validate(createArticleSchema), createArticle);
router.put('/:id', validate(updateArticleSchema), updateArticle);
router.delete('/:id', deleteArticle);

export default router; 