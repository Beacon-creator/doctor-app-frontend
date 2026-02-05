import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../styles/ThemeContext";

export default function SearchInput({ placeholder }: any) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginTop: 12,
      }}
    >
      <Ionicons
        name="search-outline"
        size={18}
        color={theme.colors.muted}
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        style={{
          flex: 1,
          padding: 12,
          color: theme.colors.text,
        }}
      />

      <Ionicons
        name="mic-outline"
        size={18}
        color={theme.colors.primary}
      />
    </View>
  );
}
