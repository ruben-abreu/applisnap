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

export const getAllRoles = () => {
  return axios.get(`${baseURL}/roles`);
};

export const getRole = roleId => {
  return axios.get(`${baseURL}/roles/${roleId}`);
};

export const addRole = role => {
  return axios.post(`${baseURL}/roles`, role);
};

export const deleteRole = roleId => {
  return axios.delete(`${baseURL}/roles/${roleId}`);
};
