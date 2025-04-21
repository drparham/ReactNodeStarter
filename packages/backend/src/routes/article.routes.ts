import { Router } from 'express';
import { createArticle, getArticles, getArticle, updateArticle, deleteArticle } from '../controllers/article.controller';
import { validate } from '../middleware/validate';
import { createArticleSchema, updateArticleSchema } from '../schemas/article.schema';

const router = Router();

router.post('/', validate(createArticleSchema), createArticle);
router.get('/', getArticles);
router.get('/:id', getArticle);
router.put('/:id', validate(updateArticleSchema), updateArticle);
router.delete('/:id', deleteArticle);

export default router; 