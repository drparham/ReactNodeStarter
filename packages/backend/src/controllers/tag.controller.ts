import { Request, Response } from 'express';
import { AppDataSource } from '../db/config';
import { Tag } from '../entities/Tag';
import { CreateTagInput, UpdateTagInput } from '../schemas/tag.schema';

const tagRepository = AppDataSource.getRepository(Tag);

export const createTag = async (req: Request<{}, {}, CreateTagInput>, res: Response) => {
  try {
    const { name } = req.body;
    
    const tag = new Tag();
    tag.name = name;

    const savedTag = await tagRepository.save(tag);
    return res.status(201).json(savedTag);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating tag', error });
  }
};

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagRepository.find({
      order: { name: 'ASC' }
    });
    return res.json(tags);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tags', error });
  }
};

export const getTag = async (req: Request, res: Response) => {
  try {
    const tag = await tagRepository.findOne({
      where: { id: req.params.id }
    });
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching tag', error });
  }
};

export const updateTag = async (req: Request<{ id: string }, {}, UpdateTagInput>, res: Response) => {
  try {
    const { name } = req.body;
    const tag = await tagRepository.findOne({
      where: { id: req.params.id }
    });

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    if (name) tag.name = name;

    const updatedTag = await tagRepository.save(tag);
    return res.json(updatedTag);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating tag', error });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const result = await tagRepository.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting tag', error });
  }
}; 