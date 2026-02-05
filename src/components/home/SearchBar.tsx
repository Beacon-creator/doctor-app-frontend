import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../styles/ThemeContext";

export default function SearchBar() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 12,
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        paddingHorizontal: 12,
      }}
    >
      <Ionicons name="search" size={20} color={theme.colors.muted} />

      <TextInput
        placeholder="Search a Doctor"
        placeholderTextColor={theme.colors.muted}
        style={{ flex: 1, padding: 10, color: theme.colors.text }}
      />

      <TouchableOpacity>
        <Ionicons name="mic-outline" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
