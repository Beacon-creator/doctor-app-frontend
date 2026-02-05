import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../styles/ThemeContext";

export default function HomeHeader() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
         marginTop: 50,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={{ width: 48, height: 48, borderRadius: 24 }}
        />

        <View style={{ marginLeft: 10}}>
          <Text style={{ color: theme.colors.muted }}>Welcome back</Text>
          <Text style={{ color: theme.colors.text, fontWeight: "bold" }}>
            John Doe
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.colors.text}
        />
      </TouchableOpacity>
    </View>
  );
}
