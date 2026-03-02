import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/auth/firebase";
import { useAuth } from "../../src/auth/useAuth";
import { router } from "expo-router";
import TextInputWithIcon from "../../src/components/TextInputWithIcon";
import { useTheme } from "../../src/styles/ThemeContext";
import { mapAuthError } from "@/src/auth/mapAuthErrors";


export default function Login() {
  const { theme } = useTheme();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/(tabs)");
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter your email and password.");
      return;
    }
      try {
        setSubmitting(true);
        const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
        const token = await cred.user.getIdToken();
        console.log("ID TOKEN:", token);
        router.replace("/(tabs)");
      } catch (error: any) {
        console.log("LOGIN ERROR:", error.code, error.message);
        Alert.alert("Login failed", mapAuthError(error));
      } finally {
        setSubmitting(false);
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

      <TextInputWithIcon
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        iconName="mail-outline"
        autoCapitalize="none"
      />

      <TextInputWithIcon
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secure
        showHideToggle
        iconName="lock-closed-outline"
      />

      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
          marginVertical: 20,
          alignItems: "center",
          opacity: submitting ? 0.7 : 1,
        }}
        onPress={handleLogin}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color={theme.colors.background} />
        ) : (
          <Text style={{ color: theme.colors.background, fontWeight: "bold", fontSize: 16 }}>
            Sign In
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
      style={{ alignSelf: "flex-end", marginBottom: 20 }}
      onPress={() => router.push("/(auth)/forgot-password")}
      >
        <Text style={{ color: theme.colors.primary }}>Forgot Password?</Text>
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