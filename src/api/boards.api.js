import axios from 'axios';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  });
};

setAuthorizationHeaders();

export const getAllBoards = () => {
  return axios.get(`${baseURL}/boards`);
};

export const getBoard = async boardId => {
  try {
    const response = await axios.get(`${baseURL}/boards/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching board:', error);
    throw error;
  }
};

export const addBoard = board => {
  return axios.post(`${baseURL}/boards`, board);
};

export const editBoard = (boardId, board) => {
  return axios.put(`${baseURL}/boards/${boardId}`, board);
};

export const deleteBoard = boardId => {
  return axios.delete(`${baseURL}/boards/${boardId}`);
};
