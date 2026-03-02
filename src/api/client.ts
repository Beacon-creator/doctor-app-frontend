import axios from 'axios';
import { auth } from '../auth/firebase';


const API_BASE_URL = 'http://10.21.16.190:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});


api.interceptors.request.use(async config => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
