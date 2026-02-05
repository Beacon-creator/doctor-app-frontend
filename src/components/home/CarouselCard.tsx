import { View, Text } from "react-native";
import { useTheme } from "../../styles/ThemeContext";

export default function CarouselCard() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: 260,
        height: 140,
        marginLeft: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.primary,
        padding: 16,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
        Health Tip
      </Text>

      <Text style={{ color: "#fff", marginTop: 6 }}>
        Stay hydrated and exercise daily.
      </Text>
    </View>
  );
}
