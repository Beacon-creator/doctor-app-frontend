import api from "../api/client";

export const syncUserWithBackend = async () => {
  const response = await api.get("/users/me");
  return response.data;
};
