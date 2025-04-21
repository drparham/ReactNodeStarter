import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  tags: Array<{
    id: string;
    name: string;
  }>;
  createdAt: string;
}

export interface CreateArticleInput {
  title: string;
  content: string;
  published?: boolean;
  tagIds?: string[];
}

export interface UpdateArticleInput extends Partial<CreateArticleInput> {}

export const getArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`${API_URL}/articles`);
  return response.data;
};

export const getArticle = async (slug: string): Promise<Article> => {
  const response = await axios.get(`${API_URL}/articles/${slug}`);
  return response.data;
};

export const createArticle = async (data: CreateArticleInput): Promise<Article> => {
  const response = await axios.post(`${API_URL}/articles`, data);
  return response.data;
};

export const updateArticle = async (slug: string, data: UpdateArticleInput): Promise<Article> => {
  const response = await axios.put(`${API_URL}/articles/${slug}`, data);
  return response.data;
};

export const deleteArticle = async (slug: string): Promise<void> => {
  await axios.delete(`${API_URL}/articles/${slug}`);
}; 