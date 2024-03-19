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

export const getAllLists = userId => {
  return axios.get(`${baseURL}/lists`, userId);
};

export const getList = async listId => {
  try {
    const response = await axios.get(`${baseURL}/lists/${listId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching list:', error);
    throw error;
  }
};

export const addList = list => {
  return axios.post(`${baseURL}/lists`, list);
};

export const editList = (listId, list) => {
  return axios.put(`${baseURL}/lists/${listId}`, list);
};
