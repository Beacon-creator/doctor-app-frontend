import { Stack } from "expo-router";
import { AuthProvider } from "../src/auth/AuthContext";
import { ThemeProvider } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";
import { DoctorProvider } from "@/src/context/DoctorContext";

export default function RootLayout() {
  return (
    <DoctorProvider>
      <AuthProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </AuthProvider>
    </DoctorProvider>
    
  );
}
