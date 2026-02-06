import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/auth/firebase";
import { useAuth } from "../../src/auth/useAuth";
import { router } from "expo-router";
import TestInputWithIcon from "../../src/components/TextInputWithIcon";
import { useTheme } from "../../src/styles/ThemeContext";

export default function Login() {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/(tabs)"); // redirect if logged in
    }
  }, [user, loading]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error: any) {
      console.log("LOGIN ERROR:", error.code, error.message);
    }
  };

  if (loading) return null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 30, color: theme.colors.text }}>
        Welcome Back
      </Text>

      <Text style={{ alignSelf: "flex-start", marginBottom: 10, color: theme.colors.text }}>
        Sign In
      </Text>

      <TestInputWithIcon
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        iconName="mail-outline"
      />

      <TestInputWithIcon
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secure
        showHideToggle
        iconName="lock-closed-outline"
      />

      <TouchableOpacity style={{ alignSelf: "flex-end", marginBottom: 20 }}>
        <Text style={{ color: theme.colors.primary }}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
          marginBottom: 15,
          alignItems: "center",
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: theme.colors.background, fontWeight: "bold", fontSize: 16 }}>
          Sign In
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.border,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
       
        <Text style={{ marginLeft: 10, color: theme.colors.text }}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: theme.colors.text }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
