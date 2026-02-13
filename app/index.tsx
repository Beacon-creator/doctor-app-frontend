import { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../src/auth/useAuth";
import { useTheme } from "../src/styles/ThemeContext";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function Index() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  const [readyToRedirect, setReadyToRedirect] = useState(false);


  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);
  const DEV_FORCE_LOGIN = false; // set to false to skip login during development


  // animated style
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
 
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withTiming(1, { duration: 600 });
  }, []);

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      setReadyToRedirect(true);
    }, 1200); 

    return () => clearTimeout(timer);
  }, [loading]);

  // wait for splash + auth
  if (!readyToRedirect || loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Animated.View style={animatedStyle}>
          <Image
            source={require("../assets/images/splash-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    );
  }

  if (DEV_FORCE_LOGIN) {
    return <Redirect href="/(auth)/login" />;
  }

  //original routing logic preserved
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 220,
    height: 220,
  },
});
