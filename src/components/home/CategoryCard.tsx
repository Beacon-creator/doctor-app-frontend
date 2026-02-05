import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../../styles/ThemeContext";

export default function CategoryCard({ title }: any) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        paddingHorizontal: 14,
        backgroundColor: theme.colors.card,
        borderRadius: 20,
        marginLeft: 16,
      }}
    >
      <Text style={{ color: theme.colors.text }}>{title}</Text>
    </TouchableOpacity>
  );
}
