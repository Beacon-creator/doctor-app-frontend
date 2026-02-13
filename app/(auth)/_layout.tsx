// import { Stack, Redirect } from "expo-router";
// import { useAuth } from "../../src/auth/useAuth";

// export default function AuthLayout() {
//   const { user, loading } = useAuth();

//   if (loading) return null;

//   // Redirect logged-in users away from login/register
//   if (user) return <Redirect href="/(tabs)" />;

//   return <Stack screenOptions={{ headerShown: false }} />;
// }


import { Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
