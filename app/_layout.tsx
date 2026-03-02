import { Stack } from "expo-router";
import { AuthProvider } from "../src/auth/AuthContext";
import { ThemeProvider } from "@/src/styles/ThemeContext";
import { DefaultTheme, NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useTheme } from "@/src/styles/ThemeContext";
import { DoctorProvider } from "@/src/context/DoctorContext";
import {  GestureHandlerRootView } from "react-native-gesture-handler";
import { darkTheme } from "@/src/styles/theme";



export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>   
      <DoctorProvider>
        <AuthProvider>
          <ThemeProvider>
              <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </AuthProvider>
      </DoctorProvider>
    </GestureHandlerRootView>
    
  );
}
