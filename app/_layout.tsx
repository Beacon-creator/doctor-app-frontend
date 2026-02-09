import { Stack } from "expo-router";
import { AuthProvider } from "../src/auth/AuthContext";
import { ThemeProvider } from "@react-navigation/native";
import { DefaultTheme } from "@react-navigation/native";
import { DoctorProvider } from "@/src/context/DoctorContext";
import {  GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>   
      <DoctorProvider>
        <AuthProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>
        </AuthProvider>
      </DoctorProvider>
    </GestureHandlerRootView>
    
  );
}
