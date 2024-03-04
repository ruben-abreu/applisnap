import axios from 'axios';
const baseURL = `${import.meta.env.VITE_BACKEND_URL}/auth`;

export const signup = user => {
  return axios.post(`${baseURL}/signup`, user);
};

export const login = user => {
  return axios.post(`${baseURL}/login`, user);
};

export const forgotPassword = email => {
  return axios.put(`${baseURL}/forgot-password`, { email });
};

export const resetPassword = (token, password) => {
  return axios.put(`${baseURL}/reset-password`, { token, password });
};

export const getUserDetails = userId => {
  return axios.get(`${baseURL}/users/${userId}`);
};

export const updateUser = user => {
  return axios.put(`${baseURL}/users/${user._id}`, user);
};

export const upload = image => {
  return axios.post(`${baseURL}/upload`, image);
};

export const deleteImage = imgPublicId => {
  return axios.delete(`${baseURL}/deleteImage`, { data: { imgPublicId } });
};

export const deleteAccount = userId => {
  return axios.delete(`${baseURL}/users/${userId}`);
};

export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: { Authorization: `Bearer ${storedToken}` },
  });
};
