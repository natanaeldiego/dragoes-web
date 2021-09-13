import axios from 'axios';
import { Dragons } from './ResponseManage';

const apiServer = axios.create({
  baseURL: 'https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon',
});

const getDragons = () => apiServer.get<Dragons[]>('');

const createDragons = (name: string, type: string) =>
  apiServer.post<Dragons>(`/`, {name, type});

const updateDragons = (id: number, name: string, type: string) =>
  apiServer.put<Dragons>(`/${id}`, { name, type });

const deleteDragons = (id: number) => apiServer.delete<Dragons>(`/${id}`);

export {
  getDragons,
  createDragons,
  updateDragons,
  deleteDragons
};