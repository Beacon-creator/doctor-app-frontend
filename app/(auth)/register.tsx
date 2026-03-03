import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../src/auth/firebase";
import { router } from "expo-router";
import TextInputWithIcon from "../../src/components/TextInputWithIcon";
import { useTheme } from "../../src/styles/ThemeContext";
import { mapAuthError } from "@/src/auth/mapAuthErrors";

export default function Register() {
  const { theme } = useTheme();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {
    if (!fullname || !email || !password) {
      Alert.alert("Missing info", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);

      await updateProfile(cred.user, {
        displayName: fullname.trim(),
      });

      router.replace("/(auth)/success");
    } catch (error: any) {
      Alert.alert("Registration failed", mapAuthError(error));
    } finally {
      setLoading(false);
    }
  };

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
        Create Account
      </Text>

      <TextInputWithIcon
        label="Full Name"
        placeholder="Enter your full name"
        value={fullname}
        onChangeText={setFullname}
        iconName="person-outline"
      />

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
        disabled={loading}
        style={{
          width: "100%",
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
          marginVertical: 20,
          alignItems: "center",
          opacity: loading ? 0.6 : 1,
        }}
        onPress={handleRegister}
      >
        <Text style={{ color: theme.colors.background, fontWeight: "bold", fontSize: 16 }}>
          {loading ? "Creating account..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: theme.colors.text }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
          <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}