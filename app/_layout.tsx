import { Stack } from 'expo-router';
import { useAuth } from '../src/auth/useAuth';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
