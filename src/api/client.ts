import axios from 'axios';
import { auth } from '../auth/firebase';

/**
 * Change this to your backend base URL
 * Example:
 * https://your-backend.onrender.com
 */
const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Attach Firebase ID token to every request
 */
api.interceptors.request.use(async config => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
