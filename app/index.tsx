import { Redirect } from 'expo-router';
import { useContext } from 'react';
import { AuthContext } from '../src/auth/AuthContext';

export default function Index() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return user ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
