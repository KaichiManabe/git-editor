// src/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getDocuments = async () => {
  const response = await axios.get(`${API_URL}/documents`);
  return response.data;
};

export const createDocument = async (content: string) => {
  const response = await axios.post(`${API_URL}/documents`, { content });
  return response.data;
};
