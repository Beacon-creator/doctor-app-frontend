import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../src/auth/useAuth";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return null; // Or a Splash screen component

  // Redirect logged-in users away from login/register
  if (user) return <Redirect href="/(tabs)" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
