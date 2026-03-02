import api from "../api/client";
import { auth } from "./firebase";

export async function syncUserWithBackend() {
  const token = await auth.currentUser?.getIdToken();

  return api.post(
    "/auth/sync",
    {
      fullName: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  ).then(res => res.data);
}