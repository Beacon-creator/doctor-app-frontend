import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { useTheme } from "../../styles/ThemeContext";

export default function HorizontalSelector({
  data,
  selected,
  onSelect,
}: any) {
  const { theme } = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item: string) => {
        const active = item === selected;

        return (
          <TouchableOpacity
            key={item}
            onPress={() => onSelect(item)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 10,
              marginRight: 10,
              backgroundColor: active
                ? theme.colors.primary
                : theme.colors.card,
            }}
          >
            <Text
              style={{
                color: active ? "#fff" : theme.colors.text,
                fontWeight: "600",
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
