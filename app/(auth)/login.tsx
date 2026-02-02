import { View, Text, Button } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/auth/firebase';
import { Link } from 'expo-router';
import React from 'react';

export default function LoginScreen() {
  const login = async () => {
    await signInWithEmailAndPassword(
      auth,
      'test@email.com',
      'password'
    );
  };

  return (
    <View>
      <Text>Login</Text>
      <Button title="Login" onPress={login} />
      <Link href="/register">Create account</Link>
    </View>
  );
}
