import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../../styles/ThemeContext";
import { useRouter } from "expo-router";

export default function CategoryCard({ title }: any) {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity
    onPress={() =>
      router.push({
        pathname: "/doctors",
        params: { category: title },
      })
    }
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
