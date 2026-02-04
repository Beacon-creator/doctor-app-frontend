import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTheme } from "../styles/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface TextInputWithIconProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secure?: boolean;
  iconName?: keyof typeof Ionicons.glyphMap; // Optional icon
  showHideToggle?: boolean; // For password toggle
}

export default function TextInputWithIcon({
  label,
  placeholder,
  value,
  onChangeText,
  secure = false,
  showHideToggle = false,
  iconName,
}: TextInputWithIconProps) {
  const { theme } = useTheme();
  const [hide, setHide] = useState(secure);

  return (
    <View style={{ width: "100%", marginBottom: 15 }}>
      <Text style={{ color: theme.colors.text, marginBottom: 5 }}>{label}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: 5,
          paddingHorizontal: 10,
          backgroundColor: theme.colors.card,
        }}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={theme.colors.placeholder}
            style={{ marginRight: 10 }}
          />
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hide}
          style={{
            flex: 1,
            paddingVertical: 10,
            color: theme.colors.text,
          }}
        />
        {showHideToggle && secure && (
          <TouchableOpacity onPress={() => setHide(!hide)}>
            <Ionicons
              name={hide ? "eye-off" : "eye"}
              size={20}
              color={theme.colors.placeholder}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
