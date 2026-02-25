import AsyncStorage from "@react-native-async-storage/async-storage";

export const getNotificationsEnabled = async () => {
  const val = await AsyncStorage.getItem("notificationsEnabled");
  return val === null ? true : val === "true";
};

export const setNotificationsEnabled = async (enabled: boolean) => {
  await AsyncStorage.setItem("notificationsEnabled", String(enabled));
};
