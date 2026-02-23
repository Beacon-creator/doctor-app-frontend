import api from "./client";

export type BackendNotification = {
  id: string;
  title: string;
  content: string;
  isRead: boolean;
  createdAt: string;
};

export async function fetchNotifications(): Promise<BackendNotification[]> {
  const res = await api.get("/notifications");
  return res.data;
}

export const markNotificationRead = async (id: string) => {
  await api.patch(`/notifications/${id}/read`);
};

export const deleteNotification = async (id: string) => {
  await api.delete(`/notifications/${id}`);
};
