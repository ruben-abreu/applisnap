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

export const getAllJobs = userId => {
  return axios.get(`${baseURL}/jobs`, userId);
};

export const getJob = async jobId => {
  try {
    const response = await axios.get(`${baseURL}/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job:', error);
    throw error;
  }
};

export const addJob = job => {
  return axios.post(`${baseURL}/jobs`, job);
};

export const editJob = (jobId, job) => {
  return axios.put(`${baseURL}/jobs/${jobId}`, job);
};

export const deleteJob = jobId => {
  return axios.delete(`${baseURL}/jobs/${jobId}`);
};
