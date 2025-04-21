import { Request, Response } from 'express';
import { AppDataSource } from '../db/config';
import { Article } from '../entities/Article';
import { Tag } from '../entities/Tag';
import { CreateArticleInput, UpdateArticleInput } from '../schemas/article.schema';

const articleRepository = AppDataSource.getRepository(Article);
const tagRepository = AppDataSource.getRepository(Tag);

export const createArticle = async (req: Request<{}, {}, CreateArticleInput>, res: Response) => {
  try {
    const { title, content, published, tagIds } = req.body;
    
    const article = new Article();
    article.title = title;
    article.content = content;
    article.published = published || false;

    if (tagIds && tagIds.length > 0) {
      const tags = await tagRepository.findByIds(tagIds);
      article.tags = tags;
    }

    const savedArticle = await articleRepository.save(article);
    return res.status(201).json(savedArticle);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating article', error });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await articleRepository.find({
      relations: ['tags'],
      order: { createdAt: 'DESC' }
    });
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching articles', error });
  }
};

export const getArticle = async (req: Request, res: Response) => {
  try {
    const article = await articleRepository.findOne({
      where: { id: req.params.id },
      relations: ['tags']
    });
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    return res.json(article);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching article', error });
  }
};

export const updateArticle = async (req: Request<{ id: string }, {}, UpdateArticleInput>, res: Response) => {
  try {
    const { title, content, published, tagIds } = req.body;
    const article = await articleRepository.findOne({
      where: { id: req.params.id },
      relations: ['tags']
    });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (title) article.title = title;
    if (content) article.content = content;
    if (published !== undefined) article.published = published;

    if (tagIds) {
      const tags = await tagRepository.findByIds(tagIds);
      article.tags = tags;
    }

    const updatedArticle = await articleRepository.save(article);
    return res.json(updatedArticle);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating article', error });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const result = await articleRepository.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting article', error });
  }
}; 