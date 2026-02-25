import api from "./client";

export const fetchMe = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const updateMe = async (data: {
  fullName: string;
  email?: string;
  phone?: string;
}) => {
  const res = await api.patch("/users/me", data);
  return res.data;
};
