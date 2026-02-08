import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../styles/ThemeContext";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Props = {
  title: string;
  icon: IconName;
  onPress: () => void;
};

export default function ProfileListItem({
  title,
  icon,
  onPress,
}: Props) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: theme.colors.card,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name={icon} size={22} color={theme.colors.primary} />

        <Text
          style={{
            marginLeft: 12,
            fontSize: 16,
            color: theme.colors.text,
          }}
        >
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={theme.colors.muted}
      />
    </TouchableOpacity>
  );
}
