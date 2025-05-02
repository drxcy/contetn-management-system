import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://contetn-management-system.onrender.com',
  withCredentials: true,
});

export default axiosInstance;
