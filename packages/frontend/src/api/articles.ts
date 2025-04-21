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

export const getArticles = async (admin: boolean = false, tagIds?: string[]): Promise<Article[]> => {
  const endpoint = admin ? '/admin' : '';
  const params = new URLSearchParams();
  if (tagIds && tagIds.length > 0) {
    tagIds.forEach(id => params.append('tagIds', id));
  }
  const response = await axios.get(`${API_URL}/articles${endpoint}?${params.toString()}`);
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

export const updateArticle = async (id: string, data: UpdateArticleInput): Promise<Article> => {
  const response = await axios.put(`${API_URL}/articles/${id}`, data);
  return response.data;
};

export const deleteArticle = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/articles/${id}`);
}; 