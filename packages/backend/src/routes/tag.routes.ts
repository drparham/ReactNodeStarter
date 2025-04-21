import { Router } from 'express';
import { createTag, getTags, getTag, updateTag, deleteTag } from '../controllers/tag.controller';
import { validate } from '../middleware/validate';
import { createTagSchema, updateTagSchema } from '../schemas/tag.schema';

const router = Router();

router.post('/', validate(createTagSchema), createTag);
router.get('/', getTags);
router.get('/:id', getTag);
router.put('/:id', validate(updateTagSchema), updateTag);
router.delete('/:id', deleteTag);

export default router; 