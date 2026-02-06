import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../styles/ThemeContext";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showVoiceIcon?: boolean;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
  showVoiceIcon = false,
}: SearchBarProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.card,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginVertical: 10,
      }}
    >
      <Ionicons name="search" size={20} color={theme.colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 8,
          color: theme.colors.text,
        }}
      />

      {showVoiceIcon && (
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={22} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}
