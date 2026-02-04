import api from '../api/client';

export const syncUserWithBackend = async () => {
  const response = await api.post('/auth/sync');
  return response.data;
};
