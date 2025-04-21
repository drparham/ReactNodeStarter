import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface Tag {
  id: string;
  name: string;
}

export interface CreateTagInput {
  name: string;
}

export interface UpdateTagInput extends Partial<CreateTagInput> {}

export const getTags = async (): Promise<Tag[]> => {
  const response = await axios.get(`${API_URL}/tags`);
  return response.data;
};

export const getTag = async (id: string): Promise<Tag> => {
  const response = await axios.get(`${API_URL}/tags/${id}`);
  return response.data;
};

export const createTag = async (data: CreateTagInput): Promise<Tag> => {
  const response = await axios.post(`${API_URL}/tags`, data);
  return response.data;
};

export const updateTag = async (id: string, data: UpdateTagInput): Promise<Tag> => {
  const response = await axios.put(`${API_URL}/tags/${id}`, data);
  return response.data;
};

export const deleteTag = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tags/${id}`);
}; 